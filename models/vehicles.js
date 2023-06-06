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
			type: mongoose.SchemaTypes.Decimal128,
			required: true,
		},
		longitude: {
			type: mongoose.SchemaTypes.Decimal128,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Vehicle = mongoose.model("buses", vehicleSchema);

export default Vehicle;
