import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

let Menu = ({
	icon,
	children,
	...props
}) => {
	return <MenuItem { ...props }>
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
};

export default Menu;
