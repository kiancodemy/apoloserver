import { GraphQLError } from "graphql";
export const category = {
  products: async (parent, args, { Product }) => {
    try {
      const id = parent.id;
      const find = await Product.find({ categoryId: id });
      return find;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
};
