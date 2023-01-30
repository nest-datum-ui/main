import React from 'react';
import LogsTableWarning from '@nest-datum-ui-lib/logs/components/Table/Warning';
import LogsDialogWarningDrop from '@nest-datum-ui-lib/logs/components/Dialog/Warning/Drop';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LogsTableWarning />
		<LogsDialogWarningDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
