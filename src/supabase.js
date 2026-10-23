import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_URL and VITE_SUPABASE_KEY must be configured.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

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

const uploadImage = async (image) => {
  const extension = image.name
    .split(".")
    .pop()
    ?.replace(/[^a-zA-Z0-9]/g, "");
  const filePath = `products/${Date.now()}-${file.name}`;
  //const fileName = `${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;
  const { data, error } = await supabase.storage
    .from("products")
    .upload(filePath, image, {
      contentType: image.type || "application/octet-stream",
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
        );
      }
    }

    throw insertError;
  }
};
