import { ApolloServer } from "@apollo/server";
import { categories, all, reviews } from "./data.js";
import http from "http";
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
dotenv.config();

const resolvers = {
  Query,
  category,
  Products,
  Mutation,
};
console.log(process.env.clientUrl);
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
        reviews,
        categories,
        reviews,
        all,
      };
    },
  })
);

await new Promise((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
