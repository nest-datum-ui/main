import React from 'react';
import DataTypeDialogSettingDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Setting/Drop';
import DataTypeFormSetting from '@nest-datum-ui-lib/data-type/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<DataTypeDialogSettingDrop />
		<DataTypeFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
