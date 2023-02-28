/*
import "reflect-metadata";
import * as tq from "type-graphql";
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "@generated/typegraphql-prisma";

const prisma = new PrismaClient();
const schema = await tq.buildSchema({
  resolvers,
  emitSchemaFile: true,
  validate: false,
});
const context = {
  prisma,
};

// Create a new ApolloServer instance and pass in your schema and resolvers
const apolloServer = new ApolloServer({ schema, context });

// Export a handler function that can handle incoming GraphQL requests
export const config = {
  api: {
    bodyParser: false,
  },
};

const server = await apolloServer.start();

export default apolloServer.createHandler({ path: "/api/graphql" });

*/

const adfasfasdf = {};
export default adfasfasdf;
