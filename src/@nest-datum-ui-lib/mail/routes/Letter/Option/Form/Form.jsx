import React from 'react';
import MailDialogLetterOptionDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Option/Drop';
import MailFormLetterOption from '@nest-datum-ui-lib/mail/components/Form/Letter/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogLetterOptionDrop />
		<MailFormLetterOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
