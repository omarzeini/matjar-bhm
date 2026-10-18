import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../supabase";

const toError = (error) =>
  error instanceof Error ? error : new Error(String(error));

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setProducts(await getProducts());
    } catch (fetchError) {
      setError(toError(fetchError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { products, isLoading, error, refetch };
};

export default useProducts;
