import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `#graphql
    type User {
        id: Int!
        email: String!
        name: String!
        birthDate: String!
        createdAt: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        birthDate: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(data: UserInput!): User!
    }
`;

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { data: { name: string; email: string; password: string; birthDate: string } },
    ) => {
      const { name, email, birthDate, password } = args.data;

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          birthDate: new Date(birthDate),
          password,
        },
      });

      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        birthDate: newUser.birthDate,
        createdAt: newUser.createdAt,
      };
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
