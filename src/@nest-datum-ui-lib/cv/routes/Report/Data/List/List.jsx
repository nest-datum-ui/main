import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterReport from '@nest-datum-ui-lib/cv/components/Form/Report/Filter';
import TableReport from '@nest-datum-ui-lib/cv/components/Table/Report';
import DialogReportDrop from '@nest-datum-ui-lib/cv/components/Dialog/Report/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'cv',
			text: 'CV',
		}, {
			key: '/cv/report',
			text: 'Reports',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Report list
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
				to={`/cv/report/0`}>
				Create
			</Button>
		</Box>
		<FormFilterReport />
		<TableReport storeName="cvReportList" />
		<DialogReportDrop storeName="cvReportList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
