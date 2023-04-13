import React from 'react';
import PropTypes from 'prop-types';
import {
	bool as utilsCheckBool,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import Typography from '@mui/material/Typography';
import ButtonLink from '@nest-datum-ui/Button/Link';

let Table = ({
	to,
	isDeleted,
	children,
	...props
}) => {
	return <Typography 
		{ ...to
			? {
				component: ButtonLink,
				to,
			}
			: {
				component: 'div',
			} }
		{ ...(utilsCheckBool(isDeleted) || utilsCheckNumericInt(isDeleted))
			? { 
				color: !!(isDeleted || props.variant === 'caption')
					? 'textSecondary'
					: 'secondary', 
				sx: {
					textDecoration: !!isDeleted
						? 'line-through'
						: 'initial',
				},
			}
			: {} }
		{ ...props }>
		{children}
	</Typography>;
};

Table = React.memo(Table);
Table.defaultProps = {
};
Table.propTypes = {
	to: PropTypes.string,
	isDeleted: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
};

export default Table;
