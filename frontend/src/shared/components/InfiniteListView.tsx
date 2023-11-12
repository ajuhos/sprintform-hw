import React, {useEffect} from "react";
import { useInView } from "react-intersection-observer";
import { TransitionGroup } from 'react-transition-group';
import {InfiniteData, UseInfiniteQueryResult} from "@tanstack/react-query";
import {Box, Collapse, List} from "@mui/material";
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
            <TransitionGroup appear={true} enter={true} exit={true}>
                {data.pages.flatMap((page) =>
                    page.items.map(item => (
                        <Collapse key={item[keyProp] as string} unmountOnExit>
                            <ItemComponent item={item} />
                        </Collapse>
                    ))
                )}
            </TransitionGroup>
            {hasNextPage && (
                <Box ref={ref}>
                    {isFetchingNextPage && <Loader />}
                </Box>
            )}
        </List>
    )
}