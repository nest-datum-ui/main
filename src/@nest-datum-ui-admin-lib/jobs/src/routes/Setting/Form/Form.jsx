import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormSetting from 'components/Form/Setting';

let Form = () => {
	return <ContextRoute.Provider value="jobsSettingForm">
		<PaperForm>
			<FormSetting />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
