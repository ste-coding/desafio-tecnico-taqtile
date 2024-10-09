import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `#graphql
    type User {
        id: Int!
        email: String!
        name: String!
        createdAt: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(email: String!, name: String!): User!
    }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_: any, args: { email: string; name: string }) => {
      return await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server is ready at ${url}`);
})();
