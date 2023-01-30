import React from 'react';
import DataTypeDialogTypeOptionDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Option/Drop';
import DataTypeFormTypeOption from '@nest-datum-ui-lib/data-type/components/Form/Type/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<DataTypeDialogTypeOptionDrop />
		<DataTypeFormTypeOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
