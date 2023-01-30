import React from 'react';
import LogsDialogSettingDrop from '@nest-datum-ui-lib/logs/components/Dialog/Setting/Drop';
import LogsFormSetting from '@nest-datum-ui-lib/logs/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<LogsDialogSettingDrop />
		<LogsFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
