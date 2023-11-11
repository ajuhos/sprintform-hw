import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
const Transaction = require('./src/edges/transaction').provider;

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test');

    const transactions = [];
    for (let i = 0; i < 100; i++) {
        transactions.push({
            sum: faker.finance.amount({ min: 500, max: 500000, dec: 0 }),
            currency: Math.random() > 0.2 ? 'HUF' : 'EUR',
            paid: faker.date.past(),
            summary: faker.commerce.productName(),
            category: faker.helpers.arrayElement([
                'housing', 'travel', 'food', 'utilities', 'insurance', 'healthcare',
                'financial', 'lifestyle', 'entertainment', 'miscellaneous'
            ])
        });
    }

    return Transaction.insertMany(transactions);
}

seed()
    .then(() => console.log('Seeding done.'))
    .catch(e => console.error(e));