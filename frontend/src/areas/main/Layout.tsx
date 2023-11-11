import React from "react";
import {AppBar, Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";

export const Layout: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                   SPRINTFORM
                </Toolbar>
            </AppBar>
            <Box padding={4}>
                <Outlet />
            </Box>
        </Box>
    )
}
