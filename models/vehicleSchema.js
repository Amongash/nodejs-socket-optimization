import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
	{
		uniqueId: {
			type: String,
			required: true,
		},
		vehicle_registration_number: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		operatorId: String,
		vendorId: String,
		speed: {
			type: Number,
			required: true,
		},
		stringDate: { type: Date, required: true },
		stringTime: { type: String, required: true },
	},
	{ timestamps: true }
);

export default vehicleSchema;
