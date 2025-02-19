import { ApolloServer } from "@apollo/server";
import { User } from "./model/user.js";
import http from "http";
import Product from "./model/Products.js";
import Category from "./model/category.js";
import Review from "./model/review.js";
import cookieparser from "cookie-parser";

import { typeDefs } from "./schema/type.js";
import { Mutation } from "./resolvers/mutation.js";
import { Query } from "./resolvers/Query.js";
import { expressMiddleware } from "@apollo/server/express4";
import { category } from "./resolvers/category.js";
import { Products } from "./resolvers/product.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./connect/connect.js";
dotenv.config();

const resolvers = {
  Query,
  category,
  Products,
  Mutation,
};

const app = express();

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use(
  "/graphql",
  cors({
    credentials: true,
    origin: process.env.clientUrl,
  }),
  express.json(),
  cookieparser(),

  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        Product,
        Category,
        Review,
        User
      };
    },
  })
);
await new Promise((resolve, reject) => {
  connectDB()
    .then(() => {
      httpServer.listen(
        { port: process.env.PORT },
        console.log(`server is ${process.env.PORT}`)
      );
    })
    .catch(reject);
});
