import React from 'react';
import MailDialogTemplateStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Status/Drop';
import MailFormTemplateStatus from '@nest-datum-ui-lib/mail/components/Form/Template/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogTemplateStatusDrop />
		<MailFormTemplateStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
