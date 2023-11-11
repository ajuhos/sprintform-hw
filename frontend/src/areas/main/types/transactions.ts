import {Dayjs} from "dayjs";

export enum TransactionCategory {
    housing = 'housing',
    travel = 'travel',
    food = 'food',
    utilities = 'utilities',
    insurance = 'insurance',
    healthcare = 'healthcare',
    financial = 'financial',
    lifestyle = 'lifestyle',
    entertainment = 'entertainment',
    miscellaneous = 'miscellaneous'
}

export interface RawTransaction {
    id: string
    summary: string
    category: TransactionCategory
    sum: number
    currency: string
    paid: string
}

export interface Transaction {
    id: string
    summary: string
    category: TransactionCategory
    sum: number
    currency: string
    paid: Dayjs
}