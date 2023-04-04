import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormUser from '../../../components/Form/User';

let Form = () => {
	return <ContextRoute.Provider value="ssoUserForm">
		<PaperForm>
			<FormUser />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
