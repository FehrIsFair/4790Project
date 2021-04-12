import { ApolloServer } from 'apollo-server';
import { schema } from './schema.js';
import { context } from './context.js';

const server = new ApolloServer({
  schema: schema,
  context: context,
});

server.listen().then(async ({url}) => {
  console.log(`Server running at: ${url}`)
});