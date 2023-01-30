import React from 'react';
import MailDialogTemplateDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Drop';
import MailTableTemplate from '@nest-datum-ui-lib/mail/components/Table/Template';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableTemplate />
		<MailDialogTemplateDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
