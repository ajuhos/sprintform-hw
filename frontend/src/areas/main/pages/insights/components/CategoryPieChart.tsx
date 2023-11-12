import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import React from "react";
import {CategoryInsight} from "@main/types";
import {Loader} from "@shared/components";
import {useTheme} from "@mui/material";
import {CategoryIcon} from "@main/components";

const RADIAN = Math.PI / 180;

interface CategoryPieChartProps {
    data?: CategoryInsight[]
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
    const theme = useTheme();
    if(!data) return <Loader />;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart
                width={600}
                height={300}
            >
                <Pie data={data} dataKey="sum" nameKey="category"
                     outerRadius={100} innerRadius={50}
                     labelLine={false} isAnimationActive={false}
                     label={({ cx, cy, midAngle, innerRadius, outerRadius, index, percent }) => {
                         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                         const x = cx + radius * Math.cos(-midAngle * RADIAN);
                         const y = cy + radius * Math.sin(-midAngle * RADIAN);

                         if(percent < 0.05) return null;

                         return (
                             <foreignObject  x={x- 12} y={y - 12} width={24} height={24}>
                                 <CategoryIcon color="secondary" category={data[index].category as never} />
                             </foreignObject>
                         );
                     }}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={theme.palette.primary.light} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}