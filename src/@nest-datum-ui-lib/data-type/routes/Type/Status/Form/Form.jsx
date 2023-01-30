import React from 'react';
import DataTypeDialogTypeStatusDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Status/Drop';
import DataTypeFormTypeStatus from '@nest-datum-ui-lib/data-type/components/Form/Type/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<DataTypeDialogTypeStatusDrop />
		<DataTypeFormTypeStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
