import mongoose from "mongoose";
import vehicleSchema from "./vehicleSchema.js";

const Vehicle = mongoose.model("buses", vehicleSchema);

export default Vehicle;
