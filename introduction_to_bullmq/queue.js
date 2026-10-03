import { Queue } from "bullmq";

// connection of redis server
export const connection = {
    host: "localhost",
    port: 6379,
}

const emailQueue = new Queue("emails", { connection });
const orderQueue = new Queue("orders", { connection });
const paymentQueue = new Queue("payments", { connection });

export { emailQueue, orderQueue, paymentQueue };