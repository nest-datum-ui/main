import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Table = ({
	to,
	isDeleted,
	children,
	...props
}) => {
	return <React.Fragment>
		<Typography 
			{ ...to
				? {
					component: ButtonLink,
					to,
				}
				: {
					component: 'div',
				} }
			{ ...(typeof isDeleted === 'boolean')
				? { 
					color: (isDeleted || props.variant === 'caption')
						? 'textSecondary'
						: 'secondary', 
					sx: {
						textDecoration: isDeleted
							? 'line-through'
							: 'initial',
					},
				}
				: {} }
			{ ...props }>
			{children}
		</Typography>
	</React.Fragment>
};

Table = React.memo(Table);
Table.defaultProps = {
};
Table.propTypes = {
	to: PropTypes.string,
	isDeleted: PropTypes.bool,
};

export default Table;
