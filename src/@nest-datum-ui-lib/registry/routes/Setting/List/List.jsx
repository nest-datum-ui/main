import React from 'react';
import RegistryDialogSettingDrop from '@nest-datum-ui-lib/registry/components/Dialog/Setting/Drop';
import RegistryTableSetting from '@nest-datum-ui-lib/registry/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<RegistryTableSetting />
		<RegistryDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
