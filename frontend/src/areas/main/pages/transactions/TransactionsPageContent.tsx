import React from "react";
import {FilterPane, TransactionListItem} from "./components";
import {TransactionFilter, useTransactionsQuery} from "../../queries";
import {InfiniteListView} from "../../../../shared/components/InfiniteListView.tsx";

export const TransactionsPageContent: React.FC = () => {
    const [filter, setFilter] = React.useState<TransactionFilter>({  summary: '' });
    const result = useTransactionsQuery(filter);

    return (
        <>
            <FilterPane originalFilter={filter} onChange={setFilter} />
            <InfiniteListView queryResult={result} ItemComponent={TransactionListItem} />
        </>
    )
}