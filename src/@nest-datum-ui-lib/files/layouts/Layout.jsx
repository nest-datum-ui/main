import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuPrimary from '@nest-datum-ui-lib/files/components/Menu/Primary';

let Layout = ({ children }) => {
	return <React.Fragment>
		<Box pr={2}>
			<MenuPrimary />
		</Box>
		<Outlet />
	</React.Fragment>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
