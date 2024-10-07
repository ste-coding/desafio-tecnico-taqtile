import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
    hello: String
    }
`);

const rootValue = {
  hello: () => 'Hello, world!',
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
