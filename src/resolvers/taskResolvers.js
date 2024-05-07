const tasksData = require('../data/task');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub(); // Instantiate PubSub object

const taskResolvers = {
    Query: {
        allTasks: () => {
            return tasksData.tasks;
        }
    },
    Mutation: {
        addTask: (parent, {title, description, deadline}) => {
            const newTask = {
                id: tasksData.tasks.length + 1,
                title: title,
                description: description,
                deadline: deadline,
                completed: false
            };

            tasksData.tasks.push(newTask);

            
            pubsub.publish('TASK_ADDED', { newTask: newTask }); // Use pubsub instead of PubSub
            return newTask;
        },
        updateTaskStatus: (parent, {id, title, description, deadline, completed}) => {
            // Implement updateTaskStatus logic
        },
        deleteTask: (parent, {id}) => {
            // Implement deleteTask logic
        }
    },
    Subscription: {
        newTask: {
            subscribe: () => pubsub.asyncIterator(['TASK_ADDED']) // Use pubsub instead of PubSub
        }
    }
};

module.exports = taskResolvers;
