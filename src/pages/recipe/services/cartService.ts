export const getMatchingProducts = (storeProducts: any[], missingIngredients: string[]) => {
  return storeProducts.filter((product) =>
    missingIngredients.some((ingredient) =>
      ingredient.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
};