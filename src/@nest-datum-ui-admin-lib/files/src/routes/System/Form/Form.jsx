import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormSystem from '../../../components/Form/System';

let Form = () => {
	return <ContextRoute.Provider value="filesSystemForm">
		<PaperForm>
			<FormSystem />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
