import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormContent from '../../../components/Form/Content';

let Form = () => {
	return <ContextRoute.Provider value="formsContentForm">
		<PaperForm>
			<FormContent />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
