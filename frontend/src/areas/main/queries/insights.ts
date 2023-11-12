import {useQuery} from "@tanstack/react-query";
import {CategoryInsight, DateInsight} from "@main/types";

const API_URI = import.meta.env.VITE_API_URI;

export async function fetchCategoryInsights(year?: number, month?: number): Promise<CategoryInsight[]> {
    const params = new URLSearchParams();
    if(year) params.append('year', year.toString());
    if(month) params.append('month', month.toString());

    const result = await fetch(`${API_URI}/transactions/totals-by-category?` + params);
    return result.json()
}

export const useCategoryInsightsQuery = (year?: number, month?: number) => {
    return useQuery<CategoryInsight[]>({
        queryKey: ['category-insights', year, month],
        queryFn: () => fetchCategoryInsights(year, month)
    })
}

export async function fetchDateInsights(): Promise<DateInsight[]> {
    const result = await fetch(`${API_URI}/transactions/totals-by-date`);
    return result.json()
}

export const useDateInsightsQuery = () => {
    return useQuery<DateInsight[]>({
        queryKey: ['date-insights'],
        queryFn: fetchDateInsights
    })
}