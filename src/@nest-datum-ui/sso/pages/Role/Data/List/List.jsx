import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterRole from '@nest-datum-ui/sso/components/Form/Role/Filter';
import TableRole from '@nest-datum-ui/sso/components/Table/Role';
import DialogRoleDrop from '@nest-datum-ui/sso/components/Dialog/Role/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'sso',
			text: 'SSO',
		}, {
			key: '/sso/role',
			text: 'Roles',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Roles list
			</Typography>
		</Box>
		<Box pb={2}>
			<Button
				disableElevation
				variant="contained"
				color="secondary"
				size="small"
				startIcon={<AddIcon />}
				component={Link}
				to={`/sso/role/0`}>
				Create
			</Button>
		</Box>
		<FormFilterRole />
		<TableRole />
		<DialogRoleDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
