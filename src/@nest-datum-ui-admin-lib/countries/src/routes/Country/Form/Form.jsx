import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormCountry from '../../../components/Form/Country';

let Form = () => {
	return <ContextRoute.Provider value="countriesCountryForm">
		<PaperForm>
			<FormCountry />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
