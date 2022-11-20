import React from 'react';
import { 
	Link,
	useLocation, 
} from 'react-router-dom';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuAccountContext from '@nest-datum-ui/components/Menu/Account/Context';

let Primary = () => {
	const location = useLocation();
	const avatar = '';
	const onMenu = React.useCallback((e) => {
		actionMenuOpen('menu-account-primary', e.target)();
	}, [
	]);

	return <React.Fragment>
		<Grid
			container
			spacing={2}
			alignItems="center"
			justifyContent="space-between">
			<Grid
				item
				xs={false}>
				<Avatar
					alt="AA"
					src={avatar
						? (process.env.API_FILES + avatar)
						: ''}
					{ ...(location.pathname === '/account')
						? {}
						: {
							component: Link,
							to: '/account',
						} } />
			</Grid>
			<Grid
				item
				xs={false}>
				<Typography
					component="div"
					variant="body2">
					Ihor Bielchenko
				</Typography>
				<Typography
					component="div"
					variant="caption">
					Admin
				</Typography>
			</Grid>
			<Grid
				item
				xs={false}>
				<IconButton onClick={onMenu}>
					<SettingsIcon fontSize="small" />
				</IconButton>
				<MenuAccountContext id="menu-account-primary" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
