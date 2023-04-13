import React from 'react';
import { Outlet } from 'react-router-dom';
import StyledWrapper from './Styled/Wrapper.jsx';

let Layout = ({ children, ...props }) => {
	return <StyledWrapper { ...props }>
		<Outlet />
	</StyledWrapper>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
