import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterWarning from '@nest-datum-ui-lib/logs/components/Form/Warning/Filter';
import TableWarning from '@nest-datum-ui-lib/logs/components/Table/Warning';
import DialogWarningDrop from '@nest-datum-ui-lib/logs/components/Dialog/Warning/Drop';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'logs',
			text: 'Logs',
		}, {
			key: '/logs/warning',
			text: 'Warnings',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				Warnings list
			</Typography>
		</Box>
		<FormFilterWarning />
		<TableWarning storeName="logsWarningList" />
		<DialogWarningDrop storeName="logsWarningList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
