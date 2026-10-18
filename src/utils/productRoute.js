const PRODUCT_ID_SUFFIX_PATTERN =
  /-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

export const getProductPath = (product) => {
  const slug =
    product.name
      .normalize("NFKC")
      .trim()
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-|-$/g, "") || "product";

  return `/product/${slug}-${product.id}`;
};

export const getProductIdFromSlug = (slugAndId) => {
  return slugAndId?.match(PRODUCT_ID_SUFFIX_PATTERN)?.[1] ?? null;
};
