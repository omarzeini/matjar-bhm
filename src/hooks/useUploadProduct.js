import { useCallback, useState } from "react";
import { uploadProduct as saveProduct } from "../supabase";

const toError = (error) =>
  error instanceof Error ? error : new Error(String(error));

const useUploadProduct = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (product, image) => {
    setIsUploading(true);
    setError(null);

    try {
      return await saveProduct(product, image);
    } catch (uploadError) {
      const normalizedError = toError(uploadError);
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, isUploading, error };
};

export default useUploadProduct;
