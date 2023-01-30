import React from 'react';
import DataTypeDialogSettingDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Setting/Drop';
import DataTypeTableSetting from '@nest-datum-ui-lib/data-type/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<DataTypeTableSetting />
		<DataTypeDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
