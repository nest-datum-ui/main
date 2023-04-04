import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuTabs from '../components/Menu/Tabs';
import MenuGroup from '../components/Menu/Group';
import StyledWrapper from './Styled/Wrapper.jsx';

let Layout = ({ children }) => {
	return <StyledWrapper>
		<MenuTabs />
		<MenuGroup />
		<Outlet />
	</StyledWrapper>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
