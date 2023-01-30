import React from 'react';
import CvDialogSettingDrop from '@nest-datum-ui-lib/cv/components/Dialog/Setting/Drop';
import CvTableSetting from '@nest-datum-ui-lib/cv/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<CvTableSetting />
		<CvDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
