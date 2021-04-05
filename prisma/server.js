const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')

const server = new ApolloServer({
  schema: schema,
  context: context,
});

server.listen().then(async ({url}) => {
  console.log(`Server running at: ${url}`)
});