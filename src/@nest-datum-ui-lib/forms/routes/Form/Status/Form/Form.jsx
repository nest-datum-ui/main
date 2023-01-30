import React from 'react';
import FormsDialogFormStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Status/Drop';
import FormsFormFormStatus from '@nest-datum-ui-lib/forms/components/Form/Form/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFormStatusDrop />
		<FormsFormFormStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
