import { LocationHistory } from "../helpers/db.js";

export const getLocationHistory = async (
	query = {},
	filters = { startDate, endDate, sortOrder, limit, skip }) => {
	try {
		const { startDate, endDate, sortOrder, limit, skip } = filters;
		const countPipeline = [
			{
				$match: {
					$and: [
						{ ...query },
						{
							date: {
								$gte: new Date(startDate),
								$lte: new Date(endDate),
							},
						},
					],
				},
			},
			{
				$group: {
					_id: null,
					count: { $sum: 1 },
				},
			},
		];

		const resultsPipeline = [
			{
				$match: {
					$and: [
						{ ...query },
						{
							date: {
								$gte: new Date(startDate),
								$lte: new Date(endDate),
							},
						},
					],
				},
			},
			{
				$sort: {
					date: Number(sortOrder)
				}
			},
			{
				$skip: skip
			},
			{
				$limit: limit
			},
			{
				$group: {
					_id: "$vehicle_registration_number",
					locations: {
						$push: {
							imei: "$uniqueId",
							operatorName: "$operatorName",
							vendorName: "$vendorName",
							latitude: "$latitude",
							longitude: "$longitude",
							speed: "$speed",
							stringDate: "$stringDate",
							stringTime: "$stringTime",
							date: "$date",
						}
					}
				}
			},
			{
				$project: {
					_id: 0,
					vehicleRegistrationNumber: "$_id",
					locations: 1,
				}
			},

		];

		const [countResult, results] = await Promise.all([
			LocationHistory.aggregate(countPipeline).allowDiskUse(true).exec(),
			LocationHistory.aggregate(resultsPipeline).allowDiskUse(true).exec(),
		]);

		const count = countResult.length > 0 ? countResult[0].count : 0;

		return { count, results };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
