import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import ButtonLink from '@nest-datum-ui/Button/Link';
import StyledWrapper from './Styled/Wrapper.jsx';

let Tab = ({ to, condition, label, index, ...props }) => {
	const { pathname } = useLocation();
	const isActive = utilsCheckFunc(condition)
		? condition(pathname)
		: pathname.indexOf(to) === 0;

	return <StyledWrapper
		label={label}
		{ ...props }
		{ ...isActive
			? { className: 'active' }
			: {
				component: ButtonLink,
				to,
			} } />;
};

Tab = React.memo(Tab);
Tab.defaultProps = {
	onClick: () => {},
};
Tab.propTypes = {
	label: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	condition: PropTypes.func,
};

export default Tab;
