import React, {useState} from "react";
import {AppBar, Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import {Link, Outlet, useLocation} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "@main/assets/sprintform-logo-light-p-500.png";

const MenuButtonLink: React.FC<{ children: string, to: string }> = ({ children, to }) => {
    const { pathname } = useLocation();
    const active = pathname === to;

    return (
        <Link to={to}>
            <Button variant={active ? "menu-active" : "menu"} disableRipple>
                {children}
            </Button>
        </Link>
    )
}

const MenuItemLink: React.FC<{ children: string, to: string }> = ({ children, to }) => {
    return (
        <MenuItem component={Link} to={to}>
            {children}
        </MenuItem>
    )
}

export const Layout: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <img src={Logo} alt="logo" style={{height: 20}} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <MenuButtonLink to="/">Transactions</MenuButtonLink>
                        <MenuButtonLink to="/insights">Insights</MenuButtonLink>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(anchorEl)}
                              onClose={() => setAnchorEl(null)}>
                            <MenuItemLink to="/">Transactions</MenuItemLink>
                            <MenuItemLink to="/insights">Insights</MenuItemLink>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box padding={4}>
                <Outlet />
            </Box>
        </Box>
    )
}
