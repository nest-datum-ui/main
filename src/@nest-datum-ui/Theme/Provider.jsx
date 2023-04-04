import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

let Provider = ({ children }) => {
	return <ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};

export default Provider;
