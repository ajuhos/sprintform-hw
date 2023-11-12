import {MongooseModelFactory} from "api-model-mongoose";
import {ApiRequestType, ApiEdgeQueryResponse} from "api-core";
import {PipelineStage} from "mongoose";

const edge = module.exports = MongooseModelFactory.createModel("transaction", "transactions",
    {
        summary: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: [
                'housing', 'travel', 'food', 'utilities', 'insurance', 'healthcare',
                'financial', 'lifestyle', 'entertainment', 'miscellaneous'
            ]
        },
        sum: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        paid: {
            type: Date,
            required: true
        }
    });

edge.collectionMethod("totals-by-date", async () => {
    const result = await edge.provider.aggregate([
        {
            $group: {
                _id: {
                    year: {
                        $year: '$paid'
                    },
                    month: {
                        $month: '$paid'
                    }
                },
                total_sum: {
                    $sum: '$sum'
                }
            }
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1
            }
        }
    ]);

    return new ApiEdgeQueryResponse(result.map(({ _id, total_sum }) => ({
        year: _id.year,
        month: _id.month,
        sum: total_sum
    })))
}, ApiRequestType.Read, false)

edge.collectionMethod("totals-by-category", async scope => {
    const year = parseInt(scope.request.context.parameter('year'));
    const month = parseInt(scope.request.context.parameter('month'));

    const query = [];

    if(year) {
        query.push({
            $eq: [
                {
                    $year: '$paid'
                },
                year
            ]
        });
    }

    if(month) {
        query.push({
            $eq: [
                {
                    $month: '$paid'
                },
                month
            ]
        });
    }

    const pipeline: PipelineStage[]  = [
        {
            $group: {
                _id: '$category',
                total_sum: {
                    $sum: '$sum'
                }
            }
        },
        {
            $sort: {
                total_sum: -1
            }
        }
    ];

    if(query.length) {
        pipeline.unshift({
            $match: {
                $expr: query.length === 1 ? query[0] : {
                    $and: query
                }
            }
        })
    }

    const result = await edge.provider.aggregate(pipeline);

    return new ApiEdgeQueryResponse(result.map(({ _id, total_sum }) => ({
        category: _id,
        sum: total_sum
    })))
}, ApiRequestType.Read, [ 'year', 'month' ], false)