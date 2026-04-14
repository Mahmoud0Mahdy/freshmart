import { useMemo } from "react";
import { toast } from "sonner";
import { useApp, type Product } from "../../../contexts/AppContext";

export const useProductFavorite = (product: Product) => {
  const { state, dispatch } = useApp();

  const isFavorite = useMemo(
    () => state.user?.savedProducts?.includes(product.id) || false,
    [state.user, product.id],
  );

  const toggleSaveProduct = () => {
    if (!state.isAuthenticated) {
      toast.error("Please log in to save products", {
        duration: 1500,
      });
      return false;
    }

    if (isFavorite) {
      dispatch({ type: "UNSAVE_PRODUCT", productId: product.id });
      toast.success("Product removed from favorites", {
        duration: 1200,
      });
    } else {
      dispatch({ type: "SAVE_PRODUCT", productId: product.id });
      toast.success("Product saved to favorites", {
        duration: 1200,
      });
    }

    return true;
  };

  return { isFavorite, toggleSaveProduct };
};
