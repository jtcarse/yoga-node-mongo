const { GraphQLServer } = require('graphql-yoga');
const database = require('./database.js');

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'world'}!`
  }
}

db = database.open()

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongod...');
});

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => console.log(`Server is running on port ${port}`));
