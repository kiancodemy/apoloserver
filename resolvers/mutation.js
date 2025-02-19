export const Mutation = {
  signup: async (parent, { data: { name, email, password } }, context) => {
    try {
      if (!name || !email || !password) {
        throw new Error("fill all the inputs");
      }
    } catch (err) {}
  },
  addCategory: (parent, { input }, { categories }) => {
    const neww = { id: uuidv4(), name: input.name };
    categories.push(neww);
  },
};
