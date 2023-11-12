import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import React, {useMemo} from "react";
import {DateInsight} from "@main/types";
import {Loader} from "@shared/components";
import {useTheme} from "@mui/material";

interface MonthlyTotalsBarChartProps {
    data?: DateInsight[]
    activeDate: number
    onChange: (index: number) => void
}

export const MonthlyTotalsBarChart: React.FC<MonthlyTotalsBarChartProps> = ({ data, activeDate, onChange }) => {
    const theme = useTheme();
    const totalsDataForChart = useMemo(() => {
        return data?.map((item) => ({
            label: `${item.year}/${item.month}`,
            sum: item.sum,
        })) ?? []
    }, [data]);

    if(!totalsDataForChart.length) return <Loader />;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={totalsDataForChart} width={600} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey={"sum"} label={"Monthly spending"}>
                    {totalsDataForChart.map((_entry, index) => (
                        <Cell cursor="pointer"
                              fill={index === activeDate
                                  ? theme.palette.secondary.main
                                  : theme.palette.primary.light
                              }
                              key={`cell-${index}`}
                              onClick={() => onChange(index)}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}