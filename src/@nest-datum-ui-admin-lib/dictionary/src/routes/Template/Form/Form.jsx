import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormTemplate from '../../../components/Form/Template';

let Form = () => {
	return <ContextRoute.Provider value="dictionaryTemplateForm">
		<PaperForm>
			<FormTemplate />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
