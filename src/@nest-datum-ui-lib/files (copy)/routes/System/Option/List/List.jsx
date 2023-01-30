import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormOptionFilter from '@nest-datum-ui/components/Form/Option/Filter';
import TableOption from '@nest-datum-ui/components/Table/Option';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';
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
			key: `/files/system`,
			text: 'File systems',
		}, {
			key: `/files/system/options`,
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
				component={ButtonLink}
				to={`/files/system/options/0`}>
				Create
			</Button>
		</Box>
		<FormOptionFilter storeName="filesSystemOptionsList" />
		<TableOption
			withAccessToken
			storeName="filesSystemOptionsList"
			url={process.env.SERVICE_FILES}
			path="system-option" />
		<DialogOptionDrop
			withAccessToken
			storeName="filesSystemOptionsList"
			url={process.env.SERVICE_FILES}
			path="system-option" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
