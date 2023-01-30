import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ButtonLink from '@nest-datum-ui/components/Button/Link';
import ButtonMenu from '@nest-datum-ui/components/Button/Menu';

let Edit = ({
	to,
	children,
	...props
}) => {
	return <ButtonMenu 
		icon={<EditIcon />}
		{ ...to
			? {
				to,
				component: ButtonLink,
			}
			: {} }
		{ ...props }>
		{children}
	</ButtonMenu>;
};

Edit = React.memo(Edit);
Edit.defaultProps = {
	children: 'Edit',
};
Edit.propTypes = {
	to: PropTypes.string,
	children: PropTypes.string,
};

export default Edit;
