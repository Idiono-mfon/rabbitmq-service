import amqplib from "amqplib";
import dotenv from "dotenv"

dotenv.config();

// connect();

export default class RabbitMq {

    server;
    channel;

    constructor(){
       this.server = process.env.SERVER_URL;
    }

    static async  connect  (){
        const connection = await amqplib.connect(process.env.SERVER_URL)
        this.channel = await connection.createChannel();
    }   

    static async publish (data){

       try {
            await this.connect()
            // assert queue: check is a queue exsit on the server else create in the process
            await this.channel.assertQueue("createResource", { durable: false });
// RABBITMQ_SUB_QUEUE=""

            // send to data to queue
            await this.channel.sendToQueue("createResource", Buffer.from(JSON.stringify(data)))

            console.log('data sent.....')
       } catch (error) {
           console.error(error);
       }
    }

    static async subscribe (){

        // @TODO: refactor this again

        try {
            await this.connect();
            // assert queue: check is a queue exsit on the server else create in the process
            await this.channel.assertQueue("jobs");
            // consume from queue
            this.channel.consume("jobs", (msg)=> {
                const input = JSON.parse(msg.content.toString())
                console.log('received........')
                console.log(input)
            })
        } catch (error) {
            console.error(error);
        }
    }

}