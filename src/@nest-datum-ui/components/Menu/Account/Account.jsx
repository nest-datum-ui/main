import React from 'react';
import { 
	useLogin,
	useUserData, 
} from '@nest-datum-ui/utils/hooks'
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import StyledGridWrapper from './Styled/GridWrapper.jsx';
import Context from './Context';

let Account = () => {
	const login = useLogin();
	const {
		firstname,
		lastname,
		avatar,
	} = useUserData();
	const onMenu = React.useCallback((e) => actionMenuOpen('menu-account-primary', e.target)(), [
	]);

	return <React.Fragment>
		<StyledGridWrapper
			container
			spacing={2}
			alignItems="center"
			justifyContent="space-between">
			<Grid
				item
				xs={false}>
				{avatar
					&& <Box className="avatar__box">
						avatar
					</Box>}
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
				<Context id="menu-account-primary" />
			</Grid>
		</StyledGridWrapper>
	</React.Fragment>;
};

Account = React.memo(Account);
Account.defaultProps = {
};
Account.propTypes = {
};

export default Account;
