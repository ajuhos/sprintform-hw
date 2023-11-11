import React, {useEffect} from "react";
import { useInView } from "react-intersection-observer";
import {InfiniteData, UseInfiniteQueryResult} from "@tanstack/react-query";
import {Box, List} from "@mui/material";
import {Loader} from "./";
import {PaginatedQueryResult, ObjectWithId} from "../"

interface InfiniteListViewProps<T extends ObjectWithId> {
    queryResult: UseInfiniteQueryResult<InfiniteData<PaginatedQueryResult<T>>>;
    keyProp?: keyof T;
    ItemComponent: React.FC<{ item: T }>;
}

export const InfiniteListView = <T extends ObjectWithId>({ keyProp = "id", queryResult, ItemComponent }: InfiniteListViewProps<T>) => {
    const { isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, data } = queryResult;
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage().then(() => {});
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

    if(isLoading || !data) return <Loader />;

    return (
        <List>
            {data.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.items.map(item => <ItemComponent key={item[keyProp] as string} item={item} />)}
                </React.Fragment>
            ))}
            {hasNextPage && (
                <Box ref={ref}>
                    {isFetchingNextPage && <Loader />}
                </Box>
            )}
        </List>
    )
}