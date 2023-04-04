import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Paper = (props) => {
	return <StyledWrapper { ...props } />;
};

Paper = React.memo(Paper);
Paper.defaultProps = {
};
Paper.propTypes = {
};

export default Paper;
