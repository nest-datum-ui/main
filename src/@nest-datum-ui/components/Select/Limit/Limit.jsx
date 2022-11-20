import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@nest-datum-ui/components/Select';

const range = [
	5,
	10,
	20,
	50,
	100,
];
let Limit = ({
	children,
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
};
Limit.propTypes = {
};

export default Limit;
