import express from 'express';
import Redis from 'ioredis';

const RedisRouter = express.Router();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const BANNER_KEY = "app:banner";

RedisRouter.get('/', async (req, res) => {
    const reply = await redis.ping();
    res.json({ message: `Redis ping response: ${reply}` });
})

RedisRouter.post('/banner', async (req, res) => {
    await redis.set(BANNER_KEY, req.body.message || "Welcome to our application!");
    res.json({ message: "Banner updated successfully" });
})
RedisRouter.get('/banner', async (req, res) => {
    
    const bannerMessage = await redis.get(BANNER_KEY);
    res.json({ message: bannerMessage || "No banner message set" });
})
RedisRouter.delete('/banner', async (req, res) => {
    await redis.del(BANNER_KEY);
    res.json({ message: "Banner deleted successfully" });
})
RedisRouter.get('/banner/exists', async (req, res) => {
    const exists = await redis.exists(BANNER_KEY);
    res.json({ exists: exists === 1 });
})

export default RedisRouter;