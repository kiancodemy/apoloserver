export const Query = {
  Products: async (_, { filter }, { all }) => {
    try {
      let products = all;
      if (filter) {
        products = products.filter((item) => item.onSale === filter.onSale);
      }
      return products;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  Product: (_, args, { all }) => {
    const id = args.id;
    const find = all.find((item) => item.id === id);
    if (find) {
      return find;
    } else {
      return null;
    }
  },
  categories: async (_, args, { categories }) => {
    return categories;
  },
};
