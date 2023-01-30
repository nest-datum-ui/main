import React from 'react';
import FormsDialogContentStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Status/Drop';
import FormsFormContentStatus from '@nest-datum-ui-lib/forms/components/Form/Content/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FormsDialogContentStatusDrop />
		<FormsFormContentStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
