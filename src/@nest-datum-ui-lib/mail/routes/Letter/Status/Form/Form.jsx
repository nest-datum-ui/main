import React from 'react';
import MailDialogLetterStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Letter/Status/Drop';
import MailFormLetterStatus from '@nest-datum-ui-lib/mail/components/Form/Letter/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogLetterStatusDrop />
		<MailFormLetterStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
