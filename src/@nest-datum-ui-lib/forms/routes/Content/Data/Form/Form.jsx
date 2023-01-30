import React from 'react';
import FormsDialogContentDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Drop';
import FormsFormContent from '@nest-datum-ui-lib/forms/components/Form/Content';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogContentDrop />
		<FormsFormContent />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
