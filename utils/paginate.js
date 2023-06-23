import Joi from 'joi';

/**
 * Paginates a list of items based on the provided page options.
 * 
 * @param {Object} pageOptions - The options for pagination.
 * @param {number} pageOptions.skip - The page number to skip to. Must be greater than or equal to 1.
 * @param {number} pageOptions.limit - The maximum number of items to retrieve per page. Must be greater than 0.
 * @param {string} pageOptions.sortOrder - The sorting order. Must be "ASC" for ascending or "DESC" for descending.
 * @param {string} pageOptions.sortField - The field to sort the items by.
 * @param {number} count - The total number of items.
 * @returns {Object} - The pagination result object.
 * @property {number} page - The current page number. Starts at 1.
 * @property {number} take - The maximum number of items to retrieve per page.
 * @property {string} order - The sorting order. "ASC" for ascending or "DESC" for descending.
 * @property {number} itemCount - The total number of items.
 * @property {number} pageCount - The total number of pages.
 * @property {boolean} hasPreviousPage - Indicates if there is a previous page.
 * @property {boolean} hasNextPage - Indicates if there is a next page.
 * @property {string} sort - The field to sort the items by.
 */
export const paginate = (pageOptions, count) => {
	const schema = Joi.object({
		skip: Joi.number().integer().min(1),
		limit: Joi.number().integer().min(1),
		sortOrder: Joi.number(),
		sortField: Joi.string(),
	}).unknown(true);

	const { error } = schema.validate(pageOptions);

	if (error) {
		return {
			error: 'Invalid pageOptions',
			details: error.details
		};
	}

	const { skip: page, limit: take, sortOrder: order, sortField: sort } = pageOptions;

	const itemCount = count > 0 ? count : 0;
	const pageCount = Math.ceil(itemCount / take);

	const hasPreviousPage = count > 0 ? page > 1 : false;
	const hasNextPage = page < pageCount;
	return {
		page: count === 0 ? 1 : page,
		take,
		order: Number(order) === 1 ? 1 : -1,
		itemCount,
		pageCount,
		hasPreviousPage,
		hasNextPage,
		sort
	};
};
