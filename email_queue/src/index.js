import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const QUEUE_KEY = "queue:emails"

app.post('/emails', async (req, res) => {
    const { to, subject, body } = req.body;
    const job = {
        to,
        subject,
        body,
        createdAt: new Date().toISOString()
    }
    await redis.lpush(QUEUE_KEY,JSON.stringify(job))
    res.json({success:true,message:'Email added to queue'});
});

app.get('/emails', async (req, res) => {
    const emails = await redis.rpop(QUEUE_KEY);
    res.json({success:true,email:emails ? JSON.parse(emails) : null});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});