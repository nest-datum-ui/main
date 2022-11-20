import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormOptionFilter from '@nest-datum-ui/components/Form/Option/Filter';
import TableOption from '@nest-datum-ui/components/Table/Option';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';
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
			key: `/sso/access`,
			text: 'Accesses',
		}, {
			key: `/sso/access/options`,
			text: 'Options',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Options
			</Typography>
			<Typography
			component="div"
				variant="caption"
				color="textSecondary">
				Managing additional fields of the current entity.
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
				to={`/sso/access/options/0`}>
				Create
			</Button>
		</Box>
		<FormOptionFilter storeName="ssoAccessOptionsList" />
		<TableOption
			withAccessToken
			storeName="ssoAccessOptionsList"
			url={process.env.SERVICE_SSO}
			path="access-option" />
		<DialogOptionDrop
			withAccessToken
			storeName="ssoAccessOptionsList"
			url={process.env.SERVICE_SSO}
			path="access-option" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
