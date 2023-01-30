import React from 'react';
import CvDialogReportStatusDrop from '@nest-datum-ui-lib/cv/components/Dialog/Report/Status/Drop';
import CvTableReportStatus from '@nest-datum-ui-lib/cv/components/Table/Report/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<CvTableReportStatus />
		<CvDialogReportStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
