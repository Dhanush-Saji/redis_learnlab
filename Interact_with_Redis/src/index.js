import express from 'express';
import mongoose from 'mongoose';
import RedisRouter from './routes/redis.routes.js';

const app = express();
app.use(express.json());

app.use('/redis', RedisRouter);

app.get('/mongo', async (req, res) => {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/redis_database';
    if(mongoose.connection.readyState === 0) {
        await mongoose.connect(url);
    }
    res.json({ message: 'Connected to MongoDB', database: mongoose.connection.name });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});