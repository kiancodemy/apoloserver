export const Products = {
  reviews: async (parent, args, { Review }) => {
    try {
      const id = parent.id;
      const find = await Review.find({ productId: id });
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  category: async (parent, args, { Category }) => {
    try {
      const id = parent.categoryId;
      const find = await Category.findOne({ id: id });
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
};
