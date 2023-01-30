import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormSettingFilter from '@nest-datum-ui/components/Form/Setting/Filter';
import TableSetting from '@nest-datum-ui/components/Table/Setting';
import DialogSettingDrop from '@nest-datum-ui/components/Dialog/Setting/Drop';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'files',
			text: 'Files',
		}, {
			key: `/files/settings`,
			text: 'Settings',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box
			pt={1} 
			pb={2}>
			<Typography
				component="div"
				variant="h5">
				Settings list
			</Typography>
		</Box>
		<Box py={2}>
			<Button
				disableElevation
				variant="contained"
				color="secondary"
				size="small"
				startIcon={<AddIcon />}
				component={ButtonLink}
				to={`/files/settings/0`}>
				Create
			</Button>
		</Box>
		<FormSettingFilter storeName="filesSettingsList" />
		<TableSetting
			withAccessToken
			storeName="filesSettingsList"
			url={process.env.SERVICE_FILES}
			path="setting" />
		<DialogSettingDrop
			withAccessToken
			storeName="filesSettingsList"
			url={process.env.SERVICE_FILES}
			path="setting" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
