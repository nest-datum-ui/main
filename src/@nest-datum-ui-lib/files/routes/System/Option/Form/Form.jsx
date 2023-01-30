import React from 'react';
import FilesDialogSystemOptionDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Option/Drop';
import FilesFormSystemOption from '@nest-datum-ui-lib/files/components/Form/System/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogSystemOptionDrop />
		<FilesFormSystemOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
