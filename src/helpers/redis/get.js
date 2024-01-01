// Utils
const redisClient = require('./connect');

const getValue = async (key) => {
  try {
    const value = await redisClient.get(key);
    // logger.info(`Redis get value: ${value}`);
    return [value, null];
  } catch (err) {
    console.log(`Redis get error: ${err.message}`);
    return [null, err.message];
  }
};

module.exports = getValue;