import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './Styled/Wrapper.jsx';

let Text = ({ storeName, ...props }) => {
	return <StyledWrapper type="text" { ...props } />;
};

Text = React.memo(Text);
Text.defaultProps = {
};
Text.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
};

export default Text;
