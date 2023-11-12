import React from "react";
import {useCategoryInsightsQuery, useDateInsightsQuery} from "@main/queries";
import {Loader} from "@shared/components";
import Grid from '@mui/material/Unstable_Grid2';
import {Box, Grow, Paper, Typography} from "@mui/material";
import {CategoryList, CategoryPieChart, MonthlyTotalsBarChart} from "@main/pages/insights/components";

export const InsightsPageContent: React.FC = () => {
    const [activeDate, setActiveDate] = React.useState<number>(0);
    const { data: totalsData } = useDateInsightsQuery();
    const activeTotals = totalsData?.[activeDate];
    const { data: categoryData } = useCategoryInsightsQuery(activeTotals?.year, activeTotals?.month);

    return (
        <Grid container spacing={2} direction={{ xs: "column-reverse", md: "row" }}>
            <Grid xs={12} md={4} lg={6}>
                <Paper>
                    <Box padding={4}>
                        {activeTotals && <Typography variant="h6" gutterBottom>Spending in {activeTotals.year}/{activeTotals.month}</Typography>}
                        {!categoryData && <Loader />}
                        {categoryData && <Grid container spacing={2}>
                            <Grow in={true}>
                                <Grid xs={12} sm={6} md={12} lg={6}>
                                    <CategoryPieChart data={categoryData} />
                                </Grid>
                            </Grow>
                            <Grid xs={12} sm={6} md={12} lg={6}>
                                <CategoryList data={categoryData} sum={activeTotals?.sum} />
                            </Grid>
                        </Grid>}
                    </Box>
                </Paper>
            </Grid>
            <Grid xs={12} md={8} lg={6}>
                <Paper>
                    <Box padding={4}>
                        <Typography variant="h6" gutterBottom>Monthly Spending</Typography>
                        <MonthlyTotalsBarChart data={totalsData} activeDate={activeDate} onChange={setActiveDate} />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}