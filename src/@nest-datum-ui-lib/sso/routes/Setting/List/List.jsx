import React from 'react';
import SsoDialogSettingDrop from '@nest-datum-ui-lib/sso/components/Dialog/Setting/Drop';
import SsoTableSetting from '@nest-datum-ui-lib/sso/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableSetting />
		<SsoDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
