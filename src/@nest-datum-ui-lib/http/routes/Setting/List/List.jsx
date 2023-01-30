import React from 'react';
import HttpDialogSettingDrop from '@nest-datum-ui-lib/http/components/Dialog/Setting/Drop';
import HttpTableSetting from '@nest-datum-ui-lib/http/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<HttpTableSetting />
		<HttpDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
