import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormProvider from '../../../components/Form/Provider';

let Form = () => {
	return <ContextRoute.Provider value="filesProviderForm">
		<PaperForm>
			<FormProvider />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
