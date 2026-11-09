import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_URL and VITE_SUPABASE_KEY must be configured.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

export const validateImage = (image) => {
  if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
    throw new Error("Choose a JPEG, PNG, WebP, AVIF, or GIF image.");
  }

  if (image.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }
};

const getProductImagePath = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  try {
    const url = new URL(imageUrl);
    const projectUrl = new URL(supabaseUrl);
    const storagePrefix = "/storage/v1/object/public/products/";

    if (url.origin !== projectUrl.origin || !url.pathname.startsWith(storagePrefix)) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(storagePrefix.length));
  } catch {
    return null;
  }
};

const removeProductImage = async (imageUrl) => {
  const imagePath = getProductImagePath(imageUrl);
  if (!imagePath) {
    return;
  }

  const { error } = await supabase.storage.from("products").remove([imagePath]);
  if (error) {
    throw error;
  }
};

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export const uploadImage = async (image) => {
  validateImage(image);
  const extensionByType = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/gif": "gif",
  };
  const filePath = `products/${crypto.randomUUID()}.${extensionByType[image.type]}`;
  const { data, error } = await supabase.storage
    .from("products")
    .upload(filePath, image, {
      contentType: image.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("products")
    .getPublicUrl(data.path);

  return { path: data.path, imageUrl: publicUrlData.publicUrl };
};

export const uploadProduct = async (product, image) => {
  if (!product.name?.trim()) {
    throw new Error("Product name is required.");
  }

  if (typeof product.in_stock !== "boolean") {
    throw new Error("Product stock status must be provided.");
  }

  const uploadedImage = image ? await uploadImage(image) : null;
  const productRow = {
    name: product.name.trim(),
    description: product.description || null,
    price: Number(product.price) || null,
    category: product.category || null,
    image_url: uploadedImage?.imageUrl ?? product.image_url ?? null,
    in_stock: product.in_stock,
    name_fr: product.name_fr || null,
    name_ar: product.name_ar || null,
    description_fr: product.description_fr || null,
    description_ar: product.description_ar || null,
  };

  try {
    const { data, error } = await supabase
      .from("products")
      .insert(productRow)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (insertError) {
    if (uploadedImage) {
      const { error: cleanupError } = await supabase.storage
        .from("products")
        .remove([uploadedImage.path]);

      if (cleanupError) {
        throw new AggregateError(
          [insertError, cleanupError],
          "Product creation failed, and the uploaded image could not be removed.",
          { cause: insertError },
        );
      }
    }

    throw insertError;
  }
};

export const updateProduct = async (productId, product, image, removeImage) => {
  const { data: existingProduct, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", productId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const uploadedImage = image ? await uploadImage(image) : null;
  const imageUrl = uploadedImage?.imageUrl ??
    (removeImage ? null : existingProduct.image_url);

  try {
    const { data, error } = await supabase
      .from("products")
      .update({ ...product, image_url: imageUrl })
      .eq("id", productId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    let imageCleanupError = null;
    if (uploadedImage || removeImage) {
      try {
        await removeProductImage(existingProduct.image_url);
      } catch (cleanupError) {
        imageCleanupError = cleanupError;
      }
    }

    return { product: data, imageCleanupError };
  } catch (updateError) {
    if (uploadedImage) {
      try {
        await removeProductImage(uploadedImage.imageUrl);
      } catch (cleanupError) {
        throw new AggregateError(
          [updateError, cleanupError],
          "Product update failed, and the newly uploaded image could not be removed.",
          { cause: cleanupError },
        );
      }
    }

    throw updateError;
  }
};

export const deleteProduct = async (productId) => {
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", productId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select("id");

  if (error) {
    throw error;
  }
  if (!data?.length) {
    throw new Error(
      "No product was deleted. Check that the product exists and that the DELETE policy allows this operation.",
    );
  }

  let imageCleanupError = null;
  try {
    await removeProductImage(product.image_url);
  } catch (cleanupError) {
    imageCleanupError = cleanupError;
  }

  return { productId: data[0].id, imageCleanupError };
};
