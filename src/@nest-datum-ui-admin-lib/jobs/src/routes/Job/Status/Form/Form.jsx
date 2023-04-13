import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormStatus from 'components/Form/Status';

let Form = () => {
	return <ContextRoute.Provider value="jobsJobStatusForm">
		<PaperForm>
			<FormStatus />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
