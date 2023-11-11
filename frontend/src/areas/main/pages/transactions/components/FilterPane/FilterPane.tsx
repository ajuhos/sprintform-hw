import React, {useDeferredValue} from "react";
import {Box, Paper, Stack, TextField} from "@mui/material";
import {SumRangeSelector} from "./elements";
import {TransactionFilter} from "@main/queries";

interface Props {
    originalFilter: TransactionFilter
    onChange: (filter: TransactionFilter) => void
}

export const FilterPane: React.FC<Props> = ({ originalFilter, onChange }) => {
    const [summary, setSummary] = React.useState(originalFilter?.summary ?? '');
    const deferredSummary = useDeferredValue(summary);

    const [sum, setSum] = React.useState(originalFilter?.sum ?? { min: '', max: '' });

    React.useEffect(() => {
        onChange({ summary: deferredSummary, sum })
    }, [onChange, deferredSummary, sum])

    return (
        <Paper>
            <Box padding={2}>
                <Stack direction={'row'} spacing={2}>
                    <TextField label={'Search'} variant={'outlined'} size={"small"}
                               value={summary}
                               onChange={e => setSummary(e.target.value)} />
                    <SumRangeSelector value={sum} onChange={setSum} />
                </Stack>
            </Box>
        </Paper>
    )
}