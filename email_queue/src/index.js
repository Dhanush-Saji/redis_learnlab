import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(phone, otp,'EX', 30);
    res.json({ message: 'OTP sent successfully', otp });
});

app.post('/otp-verify', async (req, res) => {
    const { phone,otp } = req.body;
    const storedOtp = await redis.get(phone);
    if (storedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    await redis.del(phone);
    res.json({ message: 'OTP verified successfully' });
});

app.get('/otp/:phone/ttl', async (req, res) => {
    const { phone } = req.params;
    const ttl = await redis.ttl(phone);
    res.json({ phone, ttl });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});