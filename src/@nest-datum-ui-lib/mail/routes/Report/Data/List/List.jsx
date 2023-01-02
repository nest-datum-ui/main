import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterReport from '@nest-datum-ui-lib/mail/components/Form/Report/Filter';
import TableReport from '@nest-datum-ui-lib/mail/components/Table/Report';
import DialogReportDrop from '@nest-datum-ui-lib/mail/components/Dialog/Report/Drop';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'mail',
			text: 'Mail',
		}, {
			key: '/mail/report',
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
		<FormFilterReport />
		<TableReport storeName="mailReportList" />
		<DialogReportDrop storeName="mailReportList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
