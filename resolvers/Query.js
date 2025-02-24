import { GraphQLError } from "graphql";
import { jwtchecker } from "../connect/jwt.js";
export const Query = {
  Products: async (_, { filter }, { Product }) => {
    try {
      let all = Product.find();
      if (filter && filter.price) {
        all = all.sort({ price: Number(filter.price) });
      }
      if (filter && filter.quantity) {
        all = all.sort({ quantity: Number(filter.quantity) });
      }
      let clone = all.clone();
      const limit = Number(filter?.limit) || 3;
      const page = Number(filter?.page) || 1;
      const skip = (page - 1) * limit;
      const allofCUrrent = await clone.countDocuments();
      const length = Number(Math.ceil(allofCUrrent / limit));

      all = all.skip(skip).limit(limit);
      const final = await all;

      return { length, products: final };
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  checkauth: async (_, args, { req }) => {
    try {
      const result = await jwtchecker(req);
      if (!result) {
        throw new GraphQLError("please login");
      }

      return { status: "sucess" };
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
