import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";
import { jwtmaker, jwtcleaner } from "../connect/jwt.js";
export const Mutation = {
  signup: async (parent, { data }, { User }) => {
    try {
      if (!data || !data.name || !data.email || !data.password) {
        throw new GraphQLError("fill all the sections");
      }
      const user = await User.create(data);
      return user;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  login: async (parent, { data }, { User, res }) => {
    try {
      if (!data.email || !data.password) {
        throw new GraphQLError("fill all the sections");
      }
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw new GraphQLError("This user doesnot exist");
      }

      if (user && (await user.comparePass(data.password))) {
        await jwtmaker(res, user._id);
      }

      return user;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  logout: async (parent, args, { res }) => {
    try {
      await jwtcleaner(res);
      return { status: "sucess" };
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
  addCategory: (parent, { input }, { categories }) => {
    const neww = { id: uuidv4(), name: input.name };
    categories.push(neww);
  },
  creatproduct: async (parent, { input }, { Product }) => {
    try {
      const id = uuidv4();
      const create = await Product.create({ id, ...input });
      return create;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
};
