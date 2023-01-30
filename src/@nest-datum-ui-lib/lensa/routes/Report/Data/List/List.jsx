import React from 'react';
import LensaDialogReportDrop from '@nest-datum-ui-lib/lensa/components/Dialog/Report/Drop';
import LensaTableReport from '@nest-datum-ui-lib/lensa/components/Table/Report';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<LensaTableReport />
		<LensaDialogReportDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
