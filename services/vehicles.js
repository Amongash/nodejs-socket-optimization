import { Vehicle } from "../helpers/db.js";

const getVehicles = async (
	options = { select: {}, pagination: { limit: {}, skip: {} } }
) => {
	try {
		const { select, pagination } = options;
		const results = await Vehicle.find(select)
			.limit(pagination.limit)
			.skip(pagination.skip);

		console.log(`Results: ${results.length}`);
		return results;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export { getVehicles };
