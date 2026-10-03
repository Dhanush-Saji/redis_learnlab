import { Worker } from "bullmq";
import { connection } from '../../queue.js';

const emailWorker = new Worker('emails', async job => {
    console.log(`Processing email job with id: ${job.id}`);
    console.log(`Email details:`, job.name, job.data);
    // Simulate email sending logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
    console.log(`Email job with id: ${job.id} processed successfully.`);
}, { connection });

emailWorker.on('completed', (job) => {
    console.log(`Job with id ${job.id} has been completed`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Job with id has failed with error: ${err.message}`);
});

export default emailWorker;