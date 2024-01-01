const generateRedisKeyNames = {
  task: (task_id) => `task_${task_id}`,
};

module.exports = generateRedisKeyNames;
