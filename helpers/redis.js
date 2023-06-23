import redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const options = {
	host: process.env.REDIS_HOST || "localhost",
	port: process.env.REDIS_PORT || 6379,
	password: process.env.REDIS_PASSWORD || "",
};

const client = redis.createClient(options);

client.on("error", (err) => {
	console.log("Redis Error " + err);
});

client.on("connect", () => {
	console.log("Redis connected");
});

client.connect().catch((err) => {
	throw err;
});

export default client;
