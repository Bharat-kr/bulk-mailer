// Utils
const redisClient = require('./connect');

const removeValue = (key) => {
  return new Promise((resolve, reject) => {
    try {
      redisClient.del(key);
      resolve([true, null]);
    } catch (err) {
      console.log(err);
      console.log(`Error while getting values from redis: `, err);
      reject([null, err.mesage]);
    }
  });
};

module.exports = removeValue;