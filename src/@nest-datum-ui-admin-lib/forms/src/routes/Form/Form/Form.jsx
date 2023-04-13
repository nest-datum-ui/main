import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormForm from '../../../components/Form/Form';

let Form = () => {
	return <ContextRoute.Provider value="formsFormForm">
		<PaperForm>
			<FormForm />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
