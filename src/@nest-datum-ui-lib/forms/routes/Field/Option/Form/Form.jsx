import React from 'react';
import FormsDialogFieldOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Option/Drop';
import FormsFormFieldOption from '@nest-datum-ui-lib/forms/components/Form/Field/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFieldOptionDrop />
		<FormsFormFieldOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
