import React from 'react';
import HttpDialogSettingDrop from '@nest-datum-ui-lib/http/components/Dialog/Setting/Drop';
import HttpFormSetting from '@nest-datum-ui-lib/http/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<HttpDialogSettingDrop />
		<HttpFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
