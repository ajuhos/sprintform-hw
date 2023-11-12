import {createTheme} from "@mui/material";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        menu: true;
        'menu-active': true;
    }
}

export const SprintformMUITheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#094346',
        },
        secondary: {
            main: '#fbae34',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'menu' },
                    style: {
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        color: 'white',
                        background: 'none',
                        '&:hover': {
                            background: 'none',
                            color: '#fbae34'
                        }
                    },
                },
                {
                    props: { variant: 'menu-active' },
                    style: {
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        color: '#fbae34',
                        background: 'none',
                        cursor: 'default',
                        '&:hover': {
                            background: 'none',
                            color: '#fbae34'
                        }
                    },
                },
            ],
        }
    }
});