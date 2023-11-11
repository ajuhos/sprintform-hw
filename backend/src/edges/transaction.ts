import {MongooseModelFactory} from "api-model-mongoose";

module.exports = MongooseModelFactory.createModel("transaction", "transactions",
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