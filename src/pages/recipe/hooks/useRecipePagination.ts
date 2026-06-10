import { useEffect, useState } from "react";
import {
  getAdminRecipes,
  getAllRecipes,
} from "../../../api/recipeApi";

const RECOMMENDATION_STORAGE_KEY =
  "recommendedRecipeIds";

export function useRecipePagination(
  aiMode: boolean = false
) {
  const [currentRecipes, setCurrentRecipes] =
    useState<any[]>([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [hasMore, setHasMore] =
    useState(true);

  // ================= LOAD RECIPES =================

  const loadRecipes = async (
    pageNumber: number
  ) => {
    setLoading(true);

    try {
      // ================= AI RECOMMENDATIONS =================

      if (aiMode) {
        const storedIds = JSON.parse(
          sessionStorage.getItem(
            RECOMMENDATION_STORAGE_KEY
          ) || "[]"
        );

        const recipes =
          await getAllRecipes(storedIds);

        setCurrentRecipes(
          recipes || []
        );

        const newIds = (
          recipes || []
        ).map((r: any) =>
          Number(r.id)
        );

        sessionStorage.setItem(
          RECOMMENDATION_STORAGE_KEY,
          JSON.stringify([
            ...storedIds,
            ...newIds,
          ])
        );

        setHasMore(
          (recipes?.length ?? 0) > 0
        );

        return;
      }

      // ================= NORMAL RECIPES =================

      const response =
        await getAdminRecipes(
          pageNumber,
          30
        );

      setCurrentRecipes(
        response.data || []
      );

      const pages = Math.ceil(
        response.totalCount /
          response.pageSize
      );

      setTotalPages(pages);

      setHasMore(
        pageNumber < pages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET WHEN MODE CHANGES =================

  useEffect(() => {
    setCurrentPage(1);

    if (aiMode) {
      sessionStorage.removeItem(
        RECOMMENDATION_STORAGE_KEY
      );
    }
  }, [aiMode]);

  // ================= LOAD =================

  useEffect(() => {
    loadRecipes(currentPage);
  }, [currentPage, aiMode]);

  // ================= NEXT =================

  const handleNext = () => {
    if (aiMode) {
      setCurrentPage(
        (prev) => prev + 1
      );
      return;
    }

    if (
      currentPage >= totalPages
    ) {
      return;
    }

    setCurrentPage(
      (prev) => prev + 1
    );
  };

  // ================= PREVIOUS =================

  const handlePrevious = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(
      (prev) => prev - 1
    );
  };

  // ================= REFRESH AI =================

  const refreshAiRecommendations =
    async () => {
      sessionStorage.removeItem(
        RECOMMENDATION_STORAGE_KEY
      );

      setCurrentPage(1);

      await loadRecipes(1);
    };

  return {
    currentPage,
    totalPages,
    currentRecipes,
    loading,
    hasMore,

    handleNext,
    handlePrevious,

    refreshAiRecommendations,
  };
}