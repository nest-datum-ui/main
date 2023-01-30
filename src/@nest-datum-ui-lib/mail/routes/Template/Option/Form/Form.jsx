import React from 'react';
import MailDialogTemplateOptionDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Option/Drop';
import MailFormTemplateOption from '@nest-datum-ui-lib/mail/components/Form/Template/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogTemplateOptionDrop />
		<MailFormTemplateOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
