const {ApolloServer, gql} = require('apollo-server');
const taskSchema = require('./schema/types/Task');
const taskResolvers = require('./resolvers/taskResolvers');

const server  = new ApolloServer({
   typeDefs: [taskSchema],
   resolvers: taskResolvers
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});