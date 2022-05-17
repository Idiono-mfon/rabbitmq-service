import RabbitMq from "./setup.js";

const data = { number: 1};

setInterval(() => RabbitMq.publish(data), 5000)