import React from 'react';
import FilesDialogSettingDrop from '@nest-datum-ui-lib/files/components/Dialog/Setting/Drop';
import FilesTableSetting from '@nest-datum-ui-lib/files/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableSetting />
		<FilesDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
