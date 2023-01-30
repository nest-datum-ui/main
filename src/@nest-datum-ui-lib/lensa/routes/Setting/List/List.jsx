import React from 'react';
import LensaDialogSettingDrop from '@nest-datum-ui-lib/lensa/components/Dialog/Setting/Drop';
import LensaTableSetting from '@nest-datum-ui-lib/lensa/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LensaTableSetting />
		<LensaDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
