import mongoose from "mongoose";
import vehicleSchema from "./vehicleSchema.js";

const locationHistorySchema = new mongoose.Schema({
	...vehicleSchema.obj,
	date: { type: Date, required: true, default: Date.now() },
});

const LocationHistory = mongoose.model(
	"locationHistory",
	locationHistorySchema,
	"locationHistory"
);

export default LocationHistory;
