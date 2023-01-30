import React from 'react';
import LogsDialogSettingDrop from '@nest-datum-ui-lib/logs/components/Dialog/Setting/Drop';
import LogsTableSetting from '@nest-datum-ui-lib/logs/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LogsTableSetting />
		<LogsDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
