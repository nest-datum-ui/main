import React from 'react';
import MailDialogLetterDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Drop';
import MailFormLetter from '@nest-datum-ui-lib/mail/components/Form/Letter';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogLetterDrop />
		<MailFormLetter />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
