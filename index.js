const express = require('express');
const app = express();

const mysqlutils = require('./mysqlutils');
const redisutils = require('./redisutils');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/students', async (req, res) => {
    try {
        let redisCacheData = await redisutils.getFromRedis('students');
        if (redisCacheData) {
            console.log('Data from Redis Cache');
            const jsonData = JSON.parse(redisCacheData);
            res.send(`<h1>Student Data from Redis</h1><pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
        } else {
            console.log('Data from MySQL RDS');
            let response = await mysqlutils.getStudentsDataFromRDS();
            await redisutils.setToRedisWithExpiry('students', JSON.stringify(response), 20);
            res.send(`<h1>Student Data from MySQL RDS</h1><pre>${JSON.stringify(response, null, 2)}</pre>`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('<h1>Error</h1><p>Internal Server Error</p>'); // HTML error response
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
