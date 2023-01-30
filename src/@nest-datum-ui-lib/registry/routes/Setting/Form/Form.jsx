import React from 'react';
import RegistryDialogSettingDrop from '@nest-datum-ui-lib/registry/components/Dialog/Setting/Drop';
import RegistryFormSetting from '@nest-datum-ui-lib/registry/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<RegistryDialogSettingDrop />
		<RegistryFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
