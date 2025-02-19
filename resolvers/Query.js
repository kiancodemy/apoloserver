export const Query = {
  Products: async (_, args, { Product }) => {
    try {
      let all = await Product.find();

      return all;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  Product: async (_, args, { Product }) => {
    const id = args.id;
    try {
      if (!id) {
        throw new GraphQLError("no id");
      }
      const find = await Product.findOne({ id });
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  categories: async (_, args, { Category }) => {
    try {
      const find = await Category.find();
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  category: async (_, args, { Category }) => {
    try {
      const id = args.id;

      if (!id) {
        throw new GraphQLError("send the id please");
      }
      const find = await Category.findById(id);
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
};
