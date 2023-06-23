import { getLimiter } from "../utils/api.js";

// define method to get a limiter by id
export const getLimiterById = async (req, res, next) => {
	// destructure id from req.params
	const { id } = req.params;
	return getLimiter(id)
		.then((data) => {
			res.status(200).json({ success: !!res, data });
		})
		.catch((err) => next(err));
};
