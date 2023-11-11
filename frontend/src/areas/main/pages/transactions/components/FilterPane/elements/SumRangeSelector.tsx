import React, {useDeferredValue, useState} from "react";
import {Stack, TextField} from "@mui/material";

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
        <Stack direction={'row'} spacing={2}>
            <TextField label={'Min'} variant={'outlined'} size={"small"}
                       value={min}
                       onChange={e => setMin(e.target.value)} />
            -
            <TextField label={'Max'} variant={'outlined'} size={"small"}
                       value={max}
                       onChange={e => setMax(e.target.value)} />
        </Stack>
    )
}