import { Violation } from "../helpers/db.js";

export const getViolations = async (
    query = {},
    filters = { startDate, endDate, sortOrder, sortField, limit, skip }) => {
    try {
        const { startDate, endDate, sortOrder, sortField, limit, skip } = filters;

        const countPipeline = [
            {
                $match: {
                    insertedAt: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                    ...query,
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
                    insertedAt: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                    ...query,
                },
            },
            {
                $sort: sortField
                    ? { [sortField]: Number(sortOrder) || 1 }
                    : { insertedAt: Number(sortOrder) || 1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ];

        const [countResult, results] = await Promise.all([
            Violation.aggregate(countPipeline).allowDiskUse(true).exec(),
            Violation.aggregate(resultsPipeline).allowDiskUse(true).exec(),
        ]);

        const count = countResult.length > 0 ? countResult[0].count : 0;

        return { count, results };
    } catch (error) {
        console.log(error);
        throw error;
    }
}