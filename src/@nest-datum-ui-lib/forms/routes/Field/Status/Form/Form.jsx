import React from 'react';
import FormsDialogFieldStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Status/Drop';
import FormsFormFieldStatus from '@nest-datum-ui-lib/forms/components/Form/Field/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFieldStatusDrop />
		<FormsFormFieldStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
