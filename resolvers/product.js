export const Products = {
  reviews: (parent, args, { reviews }) => {
    return reviews.filter((item) => item.productId === parent.id);
  },
  category: (parent, args, { categories }) => {
    return categories.find((item) => item.id === parent.categoryId);
  },
};
