import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Tabs = ({ children, onChange, ...props }) => {
	return <StyledWrapper variant="scrollable" { ...props }>
		{children}
	</StyledWrapper>;
};

Tabs = React.memo(Tabs);
Tabs.defaultProps = {
	storeName: 'menu-tabs',
};
Tabs.propTypes = {
};

export default Tabs;
