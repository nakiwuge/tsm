const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./context');
const ShowApi = require('./dataSources/show');

const db = require('./models');

const UserApi= require('./dataSources/user');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    ShowApi: new ShowApi(),
    UserApi: new UserApi({ db })
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});