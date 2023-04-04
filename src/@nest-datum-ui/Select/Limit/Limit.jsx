import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledMenuItem from './Styled/MenuItem.jsx';

let Limit = ({
	children,
	range,
	value,
	...props
}) => {
	return <StyledWrapper 
		{ ...props }
		{ ...range.includes(value)
			? { value }
			: {} }>
		{children
			? children
			: range.map((item) => {
				return <StyledMenuItem 
					key={item}
					value={item}
					active={item.active}>
					{item}
				</StyledMenuItem>;
			})}
	</StyledWrapper>;
};

Limit = React.memo(Limit);
Limit.defaultProps = {
	name: 'limit',
	range: [
		5,
		10,
		20,
		50,
		100,
	],
};
Limit.propTypes = {
	range: PropTypes.array,
};

export default Limit;
