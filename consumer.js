import amqplib from "amqplib";
import dotenv from "dotenv"

dotenv.config();


// connect to amqlib server
const data = { number: 19 }

connect();

// setInterval(3000, ()=> )

async function connect(){

    try {
        const connection = await amqplib.connect(process.env.SERVER_URL)

        // create a channel (channel in the consumer is different from channer in the producer)
        const channel = await connection.createChannel()

        // assert queue: check is a queu exits on the server else create in the process
       const result = await channel.assertQueue();

        // consume channel

        channel.consume('jobs', msg => {
            console.log(msg)
        })

         // Clients/consumer must always be kept alive

        console.log("waiting for messages....");
    } catch (error) {
        console.error(error);
    }
}