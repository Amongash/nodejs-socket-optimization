import * as LocationHistorySevice from "../services/locationHistory.js";
import { paginate } from "../utils/paginate.js";
export const getLocationHistory = async (req, res, next) => {
	return LocationHistorySevice.getLocationHistory(req.query, req.filters)
		.then((data) => {
			res.json({
				success: !!data,
				data: data.results,
				meta: paginate(req.filters, data.count)
			});
		})
		.catch((error) => next(error));
};
