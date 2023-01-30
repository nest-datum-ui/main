import React from 'react';
import FormsDialogSettingDrop from '@nest-datum-ui-lib/forms/components/Dialog/Setting/Drop';
import FormsFormSetting from '@nest-datum-ui-lib/forms/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogSettingDrop />
		<FormsFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
