import React from 'react';
import MailDialogTemplateDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Drop';
import MailFormTemplate from '@nest-datum-ui-lib/mail/components/Form/Template';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogTemplateDrop />
		<MailFormTemplate />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
