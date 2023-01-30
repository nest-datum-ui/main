import React from 'react';
import FormsDialogContentOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Option/Drop';
import FormsFormContentOption from '@nest-datum-ui-lib/forms/components/Form/Content/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogContentOptionDrop />
		<FormsFormContentOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
