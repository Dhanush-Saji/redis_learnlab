import { Worker } from "bullmq";
import { connection } from '../../queue.js';

const orderWorker = new Worker('orders', async job => {
    console.log(`Processing order job with id: ${job.id}`);
    console.log(`Order details:`, job.name, job.data);
    // Simulate order processing logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
    console.log(`Order job with id: ${job.id} processed successfully.`);
}, { connection });

orderWorker.on('completed', (job) => {
    console.log(`Job with id ${job.id} has been completed`);
});

orderWorker.on('failed', (job, err) => {
    console.error(`Job with id has failed with error: ${err.message}`);
});

export default orderWorker;