import { LocationHistory } from "../helpers/db.js";

export const getLocationHistory = async (
	query = {},
	filters = { startDate, endDate, sortOrder: -1, limit, skip }
) => {
	try {
		const { startDate, endDate, sortOrder, limit, skip } = filters;

		const results = await LocationHistory.aggregate([
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

		])
			.allowDiskUse(true)
			.exec();

		return results;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
