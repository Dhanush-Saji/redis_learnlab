import { Worker } from "bullmq";
import { connection } from '../../queue.js';

const paymentWorker = new Worker('payments', async job => {
    console.log(`Processing payment job with id: ${job.id}`);
    console.log(`Payment details:`, job.name, job.data);
    // Simulate payment processing logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
    console.log(`Payment job with id: ${job.id} processed successfully.`);
}, { connection });

paymentWorker.on('completed', (job) => {
    console.log(`Job with id ${job.id} has been completed`);
});

paymentWorker.on('failed', (job, err) => {
    console.error(`Job with id  has failed with error: ${err.message}`);
});

export default paymentWorker;