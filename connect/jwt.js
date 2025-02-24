import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";

export const jwtmaker = async (res, id) => {
  try {
    var token = await jwt.sign({ id }, process.env.secretkey, {
      expiresIn: "1h",
    });

    await res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",

      maxAge: 60 * 60 * 1000,
    });
    return true;
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const jwtcleaner = async (res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return true;
  } catch (err) {
    throw new GraphQLError(err);
  }
};
export const jwtchecker = async (req) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const jwtuser = async (token, user) => {
  try {
    const { id } = jwt.verify(token, process.env.secretkey);

    const find = await user.findById(id);
    if (!find) {
      throw new GraphQLError(err);
    }
    return true;
  } catch (err) {
    throw new GraphQLError(err);
  }
};
