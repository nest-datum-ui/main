import React from 'react';
import MailDialogTemplateOptionDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Option/Drop';
import MailTableTemplateOption from '@nest-datum-ui-lib/mail/components/Table/Template/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableTemplateOption />
		<MailDialogTemplateOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
