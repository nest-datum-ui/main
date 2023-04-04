import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Tab = ({ ...props }) => {
	return <StyledWrapper { ...props } />;
};

Tab = React.memo(Tab);
Tab.defaultProps = {
};
Tab.propTypes = {
};

export default Tab;
