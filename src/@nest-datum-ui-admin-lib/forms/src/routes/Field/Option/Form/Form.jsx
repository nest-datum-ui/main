import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormOption from 'components/Form/Option';

let Form = () => {
	return <ContextRoute.Provider value="formsFieldOptionForm">
		<PaperForm>
			<FormOption />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
