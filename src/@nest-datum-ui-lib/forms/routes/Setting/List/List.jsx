import React from 'react';
import FormsDialogSettingDrop from '@nest-datum-ui-lib/forms/components/Dialog/Setting/Drop';
import FormsTableSetting from '@nest-datum-ui-lib/forms/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableSetting />
		<FormsDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
