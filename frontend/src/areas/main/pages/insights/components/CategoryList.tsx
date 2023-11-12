import React from "react";
import {CategoryInsight} from "@main/types";
import {Loader} from "@shared/components";
import {Box, Collapse, Divider, List, Typography} from "@mui/material";
import {CategoryIcon, CurrencyValue} from "@main/components";
import {TransitionGroup} from "react-transition-group";

interface CategoryListProps {
    sum?: number
    data?: CategoryInsight[]
}

export const CategoryList: React.FC<CategoryListProps> = ({ sum, data }) => {
    if(!data) return <Loader />;

    return (
        <>
            <List>
                <TransitionGroup appear={true}>
                    {data.map((item) => (
                        <Collapse key={item.category}>
                            <Box key={item.category} display="flex" alignItems="center" padding={1}>
                                <CategoryIcon category={item.category as never} />
                                <Box flexGrow={1} marginLeft={2}>
                                    <Typography variant="body1" sx={{ textTransform: "capitalize" }}>{item.category}</Typography>
                                </Box>
                                <Typography variant="body1"><CurrencyValue amount={item.sum} currency="HUF" /></Typography>
                            </Box>
                        </Collapse>
                    ))}
                </TransitionGroup>
            </List>
            <Divider />
            <Box display="flex" alignItems="center" padding={1}>
                <Box flexGrow={1} marginLeft={5}>
                    <Typography variant="body1"><strong>Total</strong></Typography>
                </Box>
                <Typography variant="body1">
                    {(typeof sum === "number") && <strong><CurrencyValue amount={sum} currency="HUF" /></strong>}
                </Typography>
            </Box>
        </>
    )
}