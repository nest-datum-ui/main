import React from 'react';
import MailDialogLetterDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Drop';
import MailTableLetter from '@nest-datum-ui-lib/mail/components/Table/Letter';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableLetter />
		<MailDialogLetterDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
