import { GraphQLError } from "graphql";

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
  addCategory: (parent, { input }, { categories }) => {
    const neww = { id: uuidv4(), name: input.name };
    categories.push(neww);
  },
};
