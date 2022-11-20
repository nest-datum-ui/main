import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Outlet,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireRefresh as actionAuthRefresh } from '@nest-datum-ui/components/Store/auth/actions/refresh.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuLayout from '@nest-datum-ui/components/Menu/Layout';
import MenuBreadcrumbs from '@nest-datum-ui/components/Menu/Breadcrumbs';
import FormAccountPrimary from '@nest-datum-ui/components/Form/Account/Primary';
import Loader from '@nest-datum-ui/components/Loader';

let App = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const authFlag = useSelector(selectorMainExtract([ 'auth', 'authFlag' ]));

	React.useEffect(() => {
		actionAuthRefresh({
			url: process.env.SERVICE_SSO,
			path: 'user/refresh',
		})(navigate, enqueueSnackbar);
	}, [
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => {
		if (typeof authFlag === 'boolean'
			&& !authFlag) {
			navigate(`/${process.env.PAGE_SIGN_IN}`)
		}
	}, [
		authFlag,
		navigate,
	]);

	return <React.Fragment>
		{authFlag
			? <Grid
				container
				spacing={3}
				sx={{
					height: '100% !important',
					marginTop: '0px',
				}}>
				<Grid
					item
					sm={12}
					md={2}
					sx={{
						height: '100% !important',
						borderRight: '1px solid #e0e0e0',
						minWidth: '210px',
						position: 'relative',
						paddingTop: '0px !important',
					}}>
					<MenuLayout />
				</Grid>
				<Grid
					item
					sm={12}
					md={10}
					sx={{
						paddingTop: '0px !important',
						overflowY: 'auto',
						height: '100%',
					}}>
					<Box 
						pt={1}
						pr={2}>
						<Grid
							container
							spacing={3}
							alignItems="center"
							justifyContent="space-between">
							<Grid
								item
								xs={false}>
								<MenuBreadcrumbs />
							</Grid>
							<Grid
								item
								xs={false}>
								<FormAccountPrimary />
							</Grid>
						</Grid>
					</Box>
					<Box 
						pb={2}
						pr={2}>
						<Outlet />
					</Box>
				</Grid>
			</Grid>
			: <Loader visible />}
	</React.Fragment>;
};

App = React.memo(App);
App.defaultProps = {
};
App.propTypes = {
};

export default App;
