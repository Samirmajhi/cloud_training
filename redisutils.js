const { createClient } = require('redis');
const client = createClient({
    url: 'redis://rediscluster.ahvfts.ng.0001.aps1.cache.amazonaws.com:6379'}
    );

client.on('error', err => console.log('Redis Client Error', err));

let getFromRedis = async () => {
    return new Promise(async (resolve, reject) => {
        await client.connect();

        console.log('Connected to Redis');
        
        const value = await client.get('students');

        console.log('Value from Redis', value);

        await client.disconnect();
        return resolve(value);
    });
}

let setToRedisWithExpiry = async (key, value, expiry) => {
    return new Promise(async (resolve, reject) => {
        await client.connect();

        console.log('Connected to Redis');

        await client.set(key, value, 'EX', expiry);

        console.log('Value set to Redis');

        await client.disconnect();

        return resolve();

    });
}

module.exports = {
    getFromRedis,
    setToRedisWithExpiry
}