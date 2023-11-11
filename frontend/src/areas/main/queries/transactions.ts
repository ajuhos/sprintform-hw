import {useInfiniteQuery} from "@tanstack/react-query";
import {RawTransaction, Transaction} from "@main/types";
import {PaginatedQueryResult} from "@shared/types";
import dayjs from "dayjs";

const API_URI = import.meta.env.VITE_API_URI;
const PAGE_SIZE = '20';

function processRawTransaction(raw: RawTransaction): Transaction {
    return {
        ...raw,
        paid: dayjs(raw.paid)
    }
}

export interface TransactionFilter {
    summary?: string
    sum?: { min: string, max: string }
}

export async function fetchTransactions(filter: TransactionFilter, page: number): Promise<PaginatedQueryResult<Transaction>> {
    const params = new URLSearchParams();
    params.append('limit', PAGE_SIZE);
    params.append('page', '' + page);

    if (filter?.summary) params.append('where[summary][like]', filter.summary);
    if (filter?.sum?.min) params.append('where[sum][gte]', filter.sum.min);
    if (filter?.sum?.max) params.append('where[sum][lte]', filter.sum.max);

    const result = await fetch(`${API_URI}/transactions?` + params);
    const data = await result.json();

    const pageCount = +(result.headers.get('X-Total-Count') || 1);

    return {
        items: data.map(processRawTransaction),
        nextPage: pageCount > page ? (page + 1) : undefined,
        prevPage: page > 1 ? (page - 1) : undefined
    }
}

export const useTransactionsQuery = (filter: TransactionFilter) => {
    return useInfiniteQuery<PaginatedQueryResult<Transaction>>({
        queryKey: ['transactions', filter?.summary, filter?.sum?.min, filter?.sum?.max ],
        queryFn: ({ pageParam = 1 }) => fetchTransactions(filter, pageParam as number),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        getPreviousPageParam: (firstPage) => firstPage.prevPage,
        initialPageParam: 1
    })
}