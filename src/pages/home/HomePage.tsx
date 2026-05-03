import { useEffect } from "react";
import { HeroSection } from "../../components/HeroSection";
import { CategoriesSection } from "../../components/CategoriesSection";
import { RecipesSection } from "../../components/RecipesSection";
import { ChatbotSection } from "../../components/ChatbotSection";
import { GhostCraftBanner } from "../../components/GhostCraftBanner";

import FeaturedProducts from "./components/FeaturedProducts";
import DailyOffers from "./components/DailyOffers";

import { useApp } from "../../contexts/AppContext";
import { getAllProducts } from "../../api/productApi";

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
      <DailyOffers products={state.products.slice(0, 4)} />

      <CategoriesSection />
      <RecipesSection />
      <ChatbotSection />
    </div>
  );
}