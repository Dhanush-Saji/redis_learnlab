import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/user/:id/json', async (req, res) => {
    const { id } = req.params;
    await redis.set(`user:${id}`, JSON.stringify(req.body));
    res.json({ message: 'User data stored successfully' });
});

app.get('/user/:id/json', async (req, res) => {
    const { id } = req.params;
    const userData = await redis.get(`user:${id}`);
    if (!userData) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({data: JSON.parse(userData)});
});

app.post('/user/:id/hash', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await redis.hset(`user:${id}`, req.body);
    res.json({ message: 'User data stored successfully' });
});

app.get('/user/:id/hash', async (req, res) => {
    const { id } = req.params;
    const userData = await redis.hgetall(`user:${id}`);
    res.json({data: userData});
});

app.delete('/user', async (req, res) => {
    const userData = await redis.del(`user:1`);
    res.json({data: userData});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});