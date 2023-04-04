import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormRole from '../../../components/Form/Role';

let Form = () => {
	return <ContextRoute.Provider value="ssoRoleForm">
		<PaperForm>
			<FormRole />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
