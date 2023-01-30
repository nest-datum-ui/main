import React from 'react';
import MailDialogSettingDrop from '@nest-datum-ui-lib/mail/components/Dialog/Setting/Drop';
import MailFormSetting from '@nest-datum-ui-lib/mail/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<MailDialogSettingDrop />
		<MailFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
