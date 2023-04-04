import React from 'react';
import PropTypes from 'prop-types';
import { strFilled as utilsCheckStrFilled } from '@nest-datum-utils/check';
import ButtonLink from './Link';
import StyledWrapper from './Styled/Wrapper.jsx';

let Button = ({ to, ...props }) => {
	return <StyledWrapper 
		{ ...props }
		{ ...utilsCheckStrFilled(to)
			? { to, component: ButtonLink }
			: {} }
		disableElevation />;
};

Button = React.memo(Button);
Button.defaultProps = {
};
Button.propTypes = {
	to: PropTypes.string,
};

export default Button;
