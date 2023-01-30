import React from 'react';
import MailDialogReportDrop from '@nest-datum-ui-lib/mail/components/Dialog/Report/Drop';
import MailTableReport from '@nest-datum-ui-lib/mail/components/Table/Report';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableReport />
		<MailDialogReportDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
