import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuLayout from '@nest-datum-ui/components/Menu/Layout';
import MenuBreadcrumbs from '@nest-datum-ui/components/Menu/Breadcrumbs';
import MenuAccount from '@nest-datum-ui/components/Menu/Account';
import Loader from '@nest-datum-ui/components/Loader';
import StyledGridWrapper from './Styled/GridWrapper';
import hooksAutoAuthByToken from './hooks/autoAuthByToken.js';
import hooksRedirectToSignIn from './hooks/redirectToSignIn.js';

let Manager = () => {
	const authFlag = useSelector(selectorMainExtract([ 'auth', 'authFlag' ]));
	
	React.useEffect(() => hooksAutoAuthByToken(), [
	]);

	React.useEffect(() => hooksRedirectToSignIn(authFlag), [
		authFlag,
	]);

	return <React.Fragment>
		<Loader visible={!authFlag} />
		{authFlag
			&& <StyledGridWrapper
				container
				spacing={3}>
				<Grid
					item
					sm={12}
					md={2}>
					<MenuLayout />
				</Grid>
				<Grid
					item
					sm={12}
					md={10}>
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
								<MenuAccount />
							</Grid>
						</Grid>
					</Box>
					<Box 
						pb={2}
						pr={2}>
						<Outlet />
					</Box>
				</Grid>
			</StyledGridWrapper>}
		</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
};
Manager.propTypes = {
};

export default Manager;
