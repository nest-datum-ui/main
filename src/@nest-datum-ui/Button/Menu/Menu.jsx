import React from 'react';
import PropTypes from 'prop-types';
import { strFilled as utilsCheckStrFilled } from '@nest-datum-utils/check';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonLink from '../Link';

let Menu = ({
	to,
	icon,
	children,
	...props
}) => {
	return <MenuItem 
		{ ...utilsCheckStrFilled(to)
			? { to, component: ButtonLink }
			: {} }
		{ ...props }>
		{icon
			&& <ListItemIcon>
				{icon}
			</ListItemIcon>}
		<ListItemText>
			{children}
		</ListItemText>
	</MenuItem>;
};

Menu = React.memo(Menu);
Menu.defaultProps = {
};
Menu.propTypes = {
	to: PropTypes.string,
};

export default Menu;
