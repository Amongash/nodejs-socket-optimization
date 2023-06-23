/**
 * Middleware to verify and process query parameters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const verifyQueryParams = (req, res, next) => {
	/**
	 * @typedef {Object} Filters
	 * @property {string} startDate - The start date for filtering.
	 * @property {string} endDate - The end date for filtering.
	 * @property {number} sortOrder - The sort order.
	 * @property {string} sortField - The field to sort by.
	 * @property {number} limit - The maximum number of results to return.
	 * @property {number} skip - The number of results to skip.
	 */

	/** @type {Object} */
	const { query } = req;
	/** @type {Filters} */
	const filters = {};

	/**
	 * Maps a query parameter to a filter field.
	 *
	 * @param {string} queryParam - The query parameter name.
	 * @param {string} filterName - The filter field name.
	 */
	const mapQueryParamToFilter = (queryParam, filterName) => {
		if (query[queryParam]) {
			filters[filterName] = query[queryParam];
		}
	};

	mapQueryParamToFilter('vehicleRegistrationNumber', 'vehicle_registration_number');
	mapQueryParamToFilter('operatorId', 'operatorId');
	mapQueryParamToFilter('vendorId', 'vendorId');
	mapQueryParamToFilter('limiterId', 'uniqueId');

	/**
	 * Sets the start date for filtering.
	 * If not provided, set start date to past 5 minutes.
	 *
	 * @type {string}
	 */
	filters.startDate = query.startDate || new Date(new Date().getTime() - 5 * 60000);

	/**
	 * Sets the end date for filtering.
	 * If not provided, set to the current date.
	 *
	 * @type {string}
	 */
	filters.endDate = query.endDate || new Date();

	/**
	 * Sets the sort order.
	 * If not provided, set to -1.
	 *
	 * @type {number}
	 */
	filters.sortOrder = query.sortOrder || -1;

	/**
	 * Sets the field to sort by.
	 * If not provided, set to "insertedAt".
	 *
	 * @type {string}
	 */
	filters.sortField = query.sortField || 'insertedAt';

	/**
	 * Sets the maximum number of results to return.
	 * If not provided, set to undefined.
	 *
	 * @type {number}
	 */
	filters.limit = parseInt(query.limit) || undefined;

	/**
	 * Sets the number of results to skip.
	 * If pageNumber is provided, use it as skip.
	 * If skip is provided, use it as skip.
	 * If neither is provided, set to undefined.
	 *
	 * @type {number}
	 */
	filters.skip = parseInt(query.pageNumber) || parseInt(query.skip) || undefined;

	req.query = query;
	req.filters = filters;
	next();
};
