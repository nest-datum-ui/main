import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		success: {
			main: '#388e3c',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	components: {
		MuiButton: {
			styleOverrides: {
			},
		},
	},
});

export default theme;
