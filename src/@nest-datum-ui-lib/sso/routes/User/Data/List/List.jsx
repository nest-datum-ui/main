import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterUser from '@nest-datum-ui-lib/sso/components/Form/User/Filter';
import TableDataUser from '@nest-datum-ui-lib/sso/components/Table/User';
import DialogUserDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Drop';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'sso',
			text: 'SSO',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Users list
			</Typography>
		</Box>
		<TableDataUser storeName="ssoUserList">
			<Box pb={2}>
				<ButtonCreate to={`/sso/user/0`} />
			</Box>
			<FormFilterUser />
		</TableDataUser>
		<DialogUserDrop storeName="ssoUserList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
