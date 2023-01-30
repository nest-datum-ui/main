import React from 'react';
import MailDialogLetterOptionDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Option/Drop';
import MailTableLetterOption from '@nest-datum-ui-lib/mail/components/Table/Letter/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableLetterOption />
		<MailDialogLetterOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
