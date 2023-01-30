import React from 'react';
import LogsTableErr from '@nest-datum-ui-lib/logs/components/Table/Err';
import LogsDialogErrDrop from '@nest-datum-ui-lib/logs/components/Dialog/Err/Drop';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LogsTableErr />
		<LogsDialogErrDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
