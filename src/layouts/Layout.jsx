import React from 'react';
import { Outlet } from 'react-router-dom';

let Layout = () => {
	return <React.Fragment>
		<Outlet />
	</React.Fragment>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
