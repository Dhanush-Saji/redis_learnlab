import express from 'express';
import Redis from 'ioredis';
import { emailQueue } from '../queue.js';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/emails', async (req, res) => {
    await emailQueue.add('send-email',{
        to: req.body.to,
        subject: req.body.subject,
        body: req.body.body
    },
    {
        attempts: 3, // Number of retry attempts
    }
);
    res.status(201).send('Email job added to queue');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});