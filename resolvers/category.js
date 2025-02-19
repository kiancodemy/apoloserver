export const category = {
  products: (parent, args, { all }) => {
    return all.filter((item) => item.categoryId === parent.id);
  },
};
