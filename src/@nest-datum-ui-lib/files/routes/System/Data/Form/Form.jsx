import React from 'react';
import FilesDialogSystemDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Drop';
import FilesFormSystem from '@nest-datum-ui-lib/files/components/Form/System';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogSystemDrop />
		<FilesFormSystem />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
