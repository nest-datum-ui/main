import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormField from '../../../components/Form/Field';

let Form = () => {
	return <ContextRoute.Provider value="formsFieldForm">
		<PaperForm>
			<FormField />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
