import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormType from '../../../components/Form/Type';

let Form = () => {
	return <ContextRoute.Provider value="dataTypeForm">
		<PaperForm>
			<FormType />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
