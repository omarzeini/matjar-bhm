import { useEffect, useState } from "react";
import { getProductById } from "../supabase";

const toError = (error) =>
  error instanceof Error ? error : new Error(String(error));

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      setError(new Error("The product URL must include a valid product ID."));
      return () => {
        isCurrent = false;
      };
    }

    setProduct(null);
    setIsLoading(true);
    setError(null);

    const loadProduct = async () => {
      try {
        const result = await getProductById(productId);
        if (isCurrent) {
          setProduct(result);
        }
      } catch (fetchError) {
        if (isCurrent) {
          setError(toError(fetchError));
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      isCurrent = false;
    };
  }, [productId]);

  return { product, isLoading, error };
};

export default useProduct;
