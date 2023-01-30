import React from 'react';
import CvDialogReportDrop from '@nest-datum-ui-lib/cv/components/Dialog/Report/Drop';
import CvTableReport from '@nest-datum-ui-lib/cv/components/Table/Report';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<CvTableReport />
		<CvDialogReportDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
