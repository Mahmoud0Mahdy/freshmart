import { useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { CategoriesSection } from "./CategoriesSection";
import { RecipesSection } from "./RecipesSection";
import { ChatbotSection } from "./ChatbotSection";
import { GhostCraftBanner } from "./GhostCraftBanner";

import FeaturedProducts from "./FeaturedProducts";

import { useApp } from "../../../contexts/AppContext";
import { getAllProducts } from "../../../api/productApi";

export function HomePage() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        dispatch({ type: "SET_PRODUCTS", products: data });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <HeroSection />
      <GhostCraftBanner />

      <FeaturedProducts products={state.products.slice(0, 4)} />
      <CategoriesSection />
      <RecipesSection />
      <ChatbotSection />
    </div>
  );
}