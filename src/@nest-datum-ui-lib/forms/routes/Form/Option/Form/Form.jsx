import React from 'react';
import FormsDialogFormOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Option/Drop';
import FormsFormFormOption from '@nest-datum-ui-lib/forms/components/Form/Form/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogFormOptionDrop />
		<FormsFormFormOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
