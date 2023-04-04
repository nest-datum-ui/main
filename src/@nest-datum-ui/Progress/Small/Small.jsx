import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Small = (props) => {
	return <StyledWrapper { ...props } />;
};

Small = React.memo(Small);
Small.defaultProps = {
};
Small.propTypes = {
};

export default Small;
