import React from 'react';
import FilesDialogSettingDrop from '@nest-datum-ui-lib/files/components/Dialog/Setting/Drop';
import FilesFormSetting from '@nest-datum-ui-lib/files/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogSettingDrop />
		<FilesFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
