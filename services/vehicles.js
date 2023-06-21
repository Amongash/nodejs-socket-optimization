import dotenv from "dotenv";
import { Vehicle } from "../helpers/db.js";
dotenv.config();

const getVehicle = async (query) => {
	try {
		const result = await Vehicle.findOne(query).exec();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getVehicles = async (
	options = {
		select: {},
		pagination: { limit: 100, skip: 0 },
	}
) => {
	try {
		const { select, pagination } = options;
		const results = await Vehicle.find(select)
			.limit(pagination.limit)
			.skip(pagination.skip)
			.exec();

		console.log(`Results: ${results.length}`);
		return results;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// define method to get a vehicle by device id
export const getVehicleByDeviceId = async (id) => {
	try {
		const result = await getVehicle({ uniqueId: id });
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getVehicleByRegistrationNumber = async (
	vehicle_registration_number
) => {
	try {
		const result = await getVehicle({ vehicle_registration_number });
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTotalVehiclesByVendor = async (query) => {
	try {
		const results = await Vehicle.aggregate([
			{ $match: { ...query } },
			{
				$facet: {
					totalTransmitting: [
						{ $group: { _id: "$vendorId", totalTransmitting: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								totalTransmitting: 1,
							},
						},
					],
					offline: [
						{
							$match: {
								timestamp: {
									$lt: new Date(
										new Date().getTime() -
											process.env.OFFLINE_TIME_IN_MILLISECONDS
									),
								},
							},
						},
						{ $group: { _id: "$vendorId", offline: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								offline: 1,
							},
						},
					],
					online: [
						{
							$match: {
								timestamp: {
									$gte: new Date(
										new Date().getTime() -
											process.env.OFFLINE_TIME_IN_MILLISECONDS
									),
								},
							},
						},
						{ $group: { _id: "$vendorId", online: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								online: 1,
							},
						},
					],
				},
			},
			{
				$project: {
					results: {
						$concatArrays: ["$totalTransmitting", "$offline", "$online"],
					},
				},
			},
			{
				$unwind: "$results",
			},
			{
				$group: {
					_id: "$results._id",
					data: { $push: "$results" },
				},
			},
			{
				$project: {
					_id: 0,
					vendor_id: "$_id",
					vendorName: "$vendorName",
					result: {
						$reduce: {
							input: "$data",
							initialValue: { totalTransmitting: 0, offline: 0, online: 0 },
							in: { $mergeObjects: ["$$value", "$$this"] },
						},
					},
				},
			},
			{
				$project: {
					vendor_id: 1,
					result: {
						totalTransmitting: 1,
						offline: 1,
						online: 1,
					},
				},
			},
		]).exec();

		return results;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTotalVehiclesByOperator = async (query) => {
	try {
		const results = await Vehicle.aggregate([
			{ $match: { ...query } },
			{
				$facet: {
					totalTransmitting: [
						{ $group: { _id: "$operatorId", totalTransmitting: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								totalTransmitting: 1,
							},
						},
					],
					offline: [
						{
							$match: {
								timestamp: {
									$lt: new Date(
										new Date().getTime() -
											process.env.OFFLINE_TIME_IN_MILLISECONDS
									),
								},
							},
						},
						{ $group: { _id: "$operatorId", offline: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								offline: 1,
							},
						},
					],
					online: [
						{
							$match: {
								timestamp: {
									$gte: new Date(
										new Date().getTime() -
											process.env.OFFLINE_TIME_IN_MILLISECONDS
									),
								},
							},
						},
						{ $group: { _id: "$operatorId", online: { $sum: 1 } } },
						{
							$project: {
								_id: 1,
								online: 1,
							},
						},
					],
				},
			},
			{
				$project: {
					results: {
						$concatArrays: ["$totalTransmitting", "$offline", "$online"],
					},
				},
			},
			{
				$unwind: "$results",
			},
			{
				$group: {
					_id: "$results._id",
					data: { $push: "$results" },
				},
			},
			{
				$project: {
					_id: 0,
					operator_id: "$_id",
					operatorName: "$operatorName",
					result: {
						$reduce: {
							input: "$data",
							initialValue: { totalTransmitting: 0, offline: 0, online: 0 },
							in: { $mergeObjects: ["$$value", "$$this"] },
						},
					},
				},
			},
			{
				$project: {
					operator_id: 1,
					result: {
						totalTransmitting: 1,
						offline: 1,
						online: 1,
					},
				},
			},
		]).exec();

		return results;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
