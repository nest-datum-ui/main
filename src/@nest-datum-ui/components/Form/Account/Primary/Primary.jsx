import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Link,
	useLocation, 
} from 'react-router-dom';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuAccountContext from '@nest-datum-ui/components/Menu/Account/Context';

let Primary = () => {
	const location = useLocation();
	const login = useSelector(selectorMainExtract([ 'auth', 'login' ])) ?? '';
	let firstname = '',
		lastname = '',
		avatar = '';

	useSelector(selectorMainExtract([ 'auth', 'userUserOptions' ], (userUserOptions) => userUserOptions.forEach((item) => {
		switch (item['userOption']['id']) {
			case 'sso-user-option-avatar':
				try {
					avatar = JSON.parse(item['content']);
				}
				catch (err) {
					avatar = item['content'];
				}
				break;
			case 'sso-user-option-firstname':
				firstname = item['content'];
				break;
			case 'sso-user-option-lastname':
				lastname = item['content'];
				break;
			default:
				break;
		}
	})));

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
					{firstname} {lastname}
				</Typography>
				<Typography
					component="div"
					variant="caption">
					@{login}
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
