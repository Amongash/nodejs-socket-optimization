import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import Vehicle from "../models/vehicles.js";
import LocationHistory from "../models/locationHistory.js";

const connectionOptions = {
	dbName: process.env.MONGODB_NAME || "tracking",
	user: process.env.MONGODB_USER || "",
	pass: process.env.MONGODB_PASS || "",
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
mongoose
	.connect(URI, connectionOptions)
	.then(() => {
		console.log("Connection estabislished with MongoDB");
	})
	.catch((error) => console.error(error.message));
mongoose.Promise = global.Promise;

export { Vehicle, LocationHistory };
