export type ObjectWithId = { id: string }

export type PaginatedQueryResult<TQueryResult extends ObjectWithId> = {
    items: TQueryResult[],
    nextPage?: number,
    prevPage?: number
}