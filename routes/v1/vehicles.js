import express from "express";
import * as vehicleController from "../../controllers/vehicles.js";

const router = express.Router();
router.get("/", vehicleController.get);
router.get(
	"/registration_number/:vehicle",
	vehicleController.getByRegistrationNumber
);
router.get("/limiter/:id", vehicleController.getByDeviceId);
router.get("/stats/vendor", vehicleController.getVehiclesByVendor);
router.get("/stats/operator", vehicleController.getVehiclesByOperator);
export default router;
