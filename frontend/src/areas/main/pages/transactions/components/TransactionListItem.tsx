import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {CategoryIcon, CurrencyValue} from "@main/components";
import {Transaction} from "@main/types";

export const TransactionListItem: React.FC<{ item: Transaction }> = ({ item: { currency, sum, category, summary, paid } }) => {
    return (
        <ListItem secondaryAction={<strong><CurrencyValue currency={currency} amount={sum} /></strong>}>
            <ListItemAvatar>
                <Avatar sx={t => ({ backgroundColor: t.palette.primary.light })}>
                    <CategoryIcon category={category} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={summary} secondary={paid.format('YYYY.MM.DD')} />
        </ListItem>
    )
}