import React from 'react';
import LogsTableNotification from '@nest-datum-ui-lib/logs/components/Table/Notification';
import LogsDialogNotificationDrop from '@nest-datum-ui-lib/logs/components/Dialog/Notification/Drop';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LogsTableNotification />
		<LogsDialogNotificationDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
