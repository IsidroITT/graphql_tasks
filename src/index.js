const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const taskSchema = require('./schema/types/task.schema');
const taskResolvers = require('./resolvers/taskResolvers');

const PORT = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs: taskSchema,
    resolvers: taskResolvers,
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`);
    new SubscriptionServer({
      execute,
      subscribe,
      schema: taskSchema,
    }, {
      server: httpServer,
      path: server.graphqlPath,
    });
  });
}

startServer();