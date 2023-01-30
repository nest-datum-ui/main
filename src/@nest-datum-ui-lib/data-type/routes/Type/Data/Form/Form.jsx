import React from 'react';
import DataTypeDialogTypeDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Drop';
import DataTypeFormType from '@nest-datum-ui-lib/data-type/components/Form/Type';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<DataTypeDialogTypeDrop />
		<DataTypeFormType />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
