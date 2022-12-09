import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterNotification from '@nest-datum-ui-lib/logs/components/Form/Notification/Filter';
import TableNotification from '@nest-datum-ui-lib/logs/components/Table/Notification';
import DialogNotificationDrop from '@nest-datum-ui-lib/logs/components/Dialog/Notification/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'logs',
			text: 'Logs',
		}, {
			key: '/logs/notification',
			text: 'Notifications',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				Notifications list
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
				to={`/logs/notification/0`}>
				Create
			</Button>
		</Box>
		<FormFilterNotification />
		<TableNotification storeName="logsNotificationList" />
		<DialogNotificationDrop storeName="logsNotificationList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
