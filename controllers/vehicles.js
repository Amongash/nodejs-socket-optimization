import * as vehicleService from "../services/vehicles.js";

export const get = async (req, res, next) => {
	return vehicleService
		.getVehicles()
		.then((data) => res.status(200).json({ success: !!data, data }))
		.catch((err) => next(err));
};

export const getByDeviceId = async (req, res, next) => {
	return vehicleService
		.getVehicleByDeviceId(req.params.id)
		.then((data) => res.status(200).json({ success: !!data, data }))
		.catch((err) => next(err));
};

// define method to get a vehicle by registration number
export const getByRegistrationNumber = async (req, res, next) => {
	return vehicleService
		.getVehicleByRegistrationNumber(req.params.vehicle)
		.then((data) => res.status(200).json({ success: !!data, data }))
		.catch((err) => next(err));
};

export const getVehiclesByVendor = async (req, res, next) => {
	return vehicleService
		.getTotalVehiclesByVendor(req.query)
		.then((data) => res.status(200).json({ success: !!data, data }))
		.catch((err) => next(err));
};

export const getVehiclesByOperator = async (req, res, next) => {
	return vehicleService
		.getTotalVehiclesByOperator(req.query)
		.then((data) => res.status(200).json({ success: !!data, data }))
		.catch((err) => next(err));
};
