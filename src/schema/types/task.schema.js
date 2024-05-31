const { gql } = require('apollo-server-express');

const taskSchema = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    deadline: String
    completed: Boolean!
  }

  type Query {
    allTasks: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String, deadline: String): Task!
    updateTaskStatus(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Task
  }

  type Subscription {
    newTask: Task!
  }
`;

module.exports = taskSchema;
