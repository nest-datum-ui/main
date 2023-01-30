import React from 'react';
import SsoDialogSettingDrop from '@nest-datum-ui-lib/sso/components/Dialog/Setting/Drop';
import SsoFormSetting from '@nest-datum-ui-lib/sso/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogSettingDrop />
		<SsoFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
