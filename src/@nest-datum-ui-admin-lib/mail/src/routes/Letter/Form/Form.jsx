import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormLetter from '../../../components/Form/Letter';

let Form = () => {
	return <ContextRoute.Provider value="mailLetterForm">
		<PaperForm>
			<FormLetter />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
