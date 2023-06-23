import * as violationService from '../services/violations.js';
import { paginate } from '../utils/paginate.js';

export const getViolations = async (req, res, next) => {
    return violationService.getViolations(req.query, req.filters)
        .then((data) => {
            res.status(200).json({
                success: !!data,
                data: data.results,
                meta: paginate(req.filters, data.count),
            });
        })
        .catch((error) => next(error));
}