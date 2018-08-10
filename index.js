const { GraphQLServer } = require('graphql-yoga');
const database = require('./database.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String
}, { collection: "cats" });

const Cat = mongoose.model('Cat', catSchema);

const typeDefs = `
  type Cat {
    name: String
  }
  type Query {
    cat(name: String): Cat
    cats: [Cat]
  }
`

const resolvers = {
  Query: {
    cat: async (name) => {
      return (await Cat.findOne(name));
    },
    cats: async () => {
      return (await Cat.find({}));
    }
  }
}

const myrrh = new Cat({ name: 'myrrh' });
const straylight = new Cat({ name: 'straylight' });

db = database.open()

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongod...');

  Cat.remove({}, (err) => {});

  myrrh.save((err) => {
    if (err) {
      console.log(`error: ${err}`);
    } else {
      console.log(`${myrrh.name} saved successfully.`);
    }
  });

  straylight.save((err) => {
    if (err) {
      console.log(`error: ${err}`);
    } else {
      console.log(`${straylight.name} saved successfully.`);
    }
  });
});

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => console.log(`Server is running on port ${port}`));
