import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterSystem from '@nest-datum-ui-lib/files/components/Form/System/Filter';
import TableSystem from '@nest-datum-ui-lib/files/components/Table/System';
import DialogSystemDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Drop';
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
			key: '/files/system',
			text: 'File systems',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				File systems list
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
				to={`/files/system/0`}>
				Create
			</Button>
		</Box>
		<FormFilterSystem />
		<TableSystem storeName="filesSystemList" />
		<DialogSystemDrop storeName="filesSystemList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
