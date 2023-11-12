import React, {useDeferredValue, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";

interface Props {
    value?: { min: string, max: string }
    onChange: (value: { min: string, max: string }) => void
}

export const SumRangeSelector: React.FC<Props> = ({ value, onChange }) => {
    const [min, setMin] = useState(value?.min ?? '');
    const [max, setMax] = useState(value?.max ?? '');

    const deferredMin = useDeferredValue(min);
    const deferredMax = useDeferredValue(max);

    React.useEffect(() => {
        onChange({ min: deferredMin, max: deferredMax })
    }, [onChange, deferredMin, deferredMax])

    return (
        <Stack direction={'row'} spacing={0}>
            <TextField label={'Min'} variant={'outlined'} size={"small"}
                       value={min} sx={{ width: 100 }}
                       onChange={e => setMin(e.target.value)} />
            <Typography variant={'h6'} sx={{ mt: .5, mr: .5, ml: .5 }}>–</Typography>
            <TextField label={'Max'} variant={'outlined'} size={"small"}
                       value={max} sx={{ width: 100 }}
                       onChange={e => setMax(e.target.value)} />
        </Stack>
    )
}