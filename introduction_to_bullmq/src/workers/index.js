
import orderWorker from "./order.worker.js";
import paymentWorker from "./payment.worker.js";
import emailWorker from "./email.worker.js";

console.log("🚀 All BullMQ workers started");

export {
    orderWorker,
    paymentWorker,
    emailWorker
};