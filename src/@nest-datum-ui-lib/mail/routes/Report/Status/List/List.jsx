import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormStatusFilter from '@nest-datum-ui/components/Form/Status/Filter';
import TableDataStatus from '@nest-datum-ui/components/Table/Status';
import DialogStatusDrop from '@nest-datum-ui/components/Dialog/Status/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'mail',
			text: 'Mail',
		}, {
			key: `/mail/report`,
			text: 'Reports',
		}, {
			key: `/mail/report/statuses`,
			text: 'Statuses',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Statuses
			</Typography>
			<Typography
				component="div"
				variant="caption"
				color="textSecondary">
				Entity state.
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
				to={`/mail/report/statuses/0`}>
				Create
			</Button>
		</Box>
		<FormStatusFilter storeName="mailReportStatusesList" />
		<TableDataStatus
			withAccessToken
			storeName="mailReportStatusesList"
			url={process.env.SERVICE_MAIL}
			path="report-status" />
		<DialogStatusDrop
			withAccessToken
			storeName="mailReportStatusesList"
			url={process.env.SERVICE_MAIL}
			path="report-status" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
