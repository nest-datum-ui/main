import React from 'react';
import CvDialogSettingDrop from '@nest-datum-ui-lib/cv/components/Dialog/Setting/Drop';
import CvFormSetting from '@nest-datum-ui-lib/cv/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<CvDialogSettingDrop />
		<CvFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
