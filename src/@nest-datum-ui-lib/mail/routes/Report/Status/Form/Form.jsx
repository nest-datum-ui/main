import React from 'react';
import MailDialogReportStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Report/Status/Drop';
import MailFormReportStatus from '@nest-datum-ui-lib/mail/components/Form/Report/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogReportStatusDrop />
		<MailFormReportStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
