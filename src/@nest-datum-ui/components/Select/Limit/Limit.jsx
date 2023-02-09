import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import Select from '@nest-datum-ui/components/Select';

let Limit = ({
	children,
	range,
	value,
	...props
}) => {
	return <React.Fragment>
		<Select 
			{ ...props }
			{ ...range.includes(value)
				? { value }
				: {} }>
			{children
				? children
				: range.map((item) => {
					return <MenuItem 
						key={item}
						value={item}>
						{item}
					</MenuItem>;
				})}
		</Select>
	</React.Fragment>;
};

Limit = React.memo(Limit);
Limit.defaultProps = {
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
