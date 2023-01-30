import React from 'react';
import MailDialogReportStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Report/Status/Drop';
import MailTableReportStatus from '@nest-datum-ui-lib/mail/components/Table/Report/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableReportStatus />
		<MailDialogReportStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
