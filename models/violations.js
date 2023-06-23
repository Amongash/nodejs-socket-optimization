import mongoose from "mongoose";

const violationSchema = new mongoose.Schema({
    message: String,
    code: Number,
    date: String,
    time: String,
    speed: Number,
    operatorId: String,
    operatorName: String,
    vendorId: String,
    vendorName: String,
    model: String,
    uniqueId: String,
    vehicle_registration_number: String,
}, { timestamps: true });

const Violation = mongoose.model("Violation", violationSchema, 'violations');

export default Violation;