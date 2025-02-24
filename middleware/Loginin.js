import { jwtuser } from "../connect/jwt.js";

import { GraphQLError } from "graphql";

export const Loginauth = async (req, user) => {
  try {
    const find = req.cookies("jwt");
    if (!find) {
      throw new GraphQLError("your not login");
    }
    await jwtuser(find, user);
  } catch (err) {
    throw new GraphQLError(err);
  }
};
