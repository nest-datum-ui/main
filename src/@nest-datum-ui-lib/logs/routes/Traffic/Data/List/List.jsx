import React from 'react';
import LogsTableTraffic from '@nest-datum-ui-lib/logs/components/Table/Traffic';
import LogsDialogTrafficDrop from '@nest-datum-ui-lib/logs/components/Dialog/Traffic/Drop';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LogsTableTraffic />
		<LogsDialogTrafficDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
