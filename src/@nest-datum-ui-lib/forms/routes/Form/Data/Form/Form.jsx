import React from 'react';
import FormsDialogFormDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Drop';
import FormsFormForm from '@nest-datum-ui-lib/forms/components/Form/Form';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFormDrop />
		<FormsFormForm />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
