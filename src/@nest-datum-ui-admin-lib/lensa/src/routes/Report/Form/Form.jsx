import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormReport from '../../../components/Form/Report';

let Form = () => {
	return <ContextRoute.Provider value="lensaReportForm">
		<PaperForm>
			<FormReport />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
