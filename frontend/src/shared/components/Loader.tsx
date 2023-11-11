import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const Loader: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}
