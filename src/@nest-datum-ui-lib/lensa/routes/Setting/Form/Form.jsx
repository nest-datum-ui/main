import React from 'react';
import LensaDialogSettingDrop from '@nest-datum-ui-lib/lensa/components/Dialog/Setting/Drop';
import LensaFormSetting from '@nest-datum-ui-lib/lensa/components/Form/Setting';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<LensaDialogSettingDrop />
		<LensaFormSetting />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
