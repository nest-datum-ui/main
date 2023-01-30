import React from 'react';
import MailDialogLetterStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Status/Drop';
import MailTableLetterStatus from '@nest-datum-ui-lib/mail/components/Table/Letter/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableLetterStatus />
		<MailDialogLetterStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
