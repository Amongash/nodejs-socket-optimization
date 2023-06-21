import * as LocationHistorySevice from "../services/locationHistory.js";

export const getLocationHistory = async (req, res, next) => {
	return LocationHistorySevice.getLocationHistory(req.query, req.filters)
		.then((data) => {
			res.json({ success: !!data, data });
		})
		.catch((error) => next(error));
};
