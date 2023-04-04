import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormAccess from 'components/Form/Access';

let Form = () => {
	return <ContextRoute.Provider value="ssoAccessForm">
		<PaperForm>
			<FormAccess />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
