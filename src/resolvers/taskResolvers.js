const tasksData = require('../data/task');

const taskResolvers = {
    Query: {
        allTasks: () => {
            return tasksData.tasks;
        }
    }
};

module.exports = taskResolvers;
