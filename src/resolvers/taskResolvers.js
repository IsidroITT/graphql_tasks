const { tasks } = require('../data/task');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const taskResolvers = {
  Query: {
    allTasks: () => tasks,
  },
  Mutation: {
    addTask: (_, { title, description, deadline }) => {
      const newTask = { id: String(tasks.length + 1), title, description, deadline, completed: false };
      tasks.push(newTask);
      pubsub.publish('NEW_TASK', { newTask });
      return newTask;
    },
    updateTaskStatus: (_, { id, completed }) => {
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) throw new Error('Task not found');
      tasks[index].completed = completed;
      return tasks[index];
    },
    deleteTask: (_, { id }) => {
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) throw new Error('Task not found');
      const deletedTask = tasks.splice(index, 1)[0];
      return deletedTask;
    },
  },
  Subscription: {
    newTask: {
      subscribe: () => pubsub.asyncIterator(['NEW_TASK']),
      resolve: payload => payload.newTask
    },
  },
};

module.exports = taskResolvers;
