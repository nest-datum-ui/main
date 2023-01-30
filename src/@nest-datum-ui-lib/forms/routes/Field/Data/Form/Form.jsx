import React from 'react';
import FormsDialogFieldDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Drop';
import FormsFormField from '@nest-datum-ui-lib/forms/components/Form/Field';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFieldDrop />
		<FormsFormField />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
