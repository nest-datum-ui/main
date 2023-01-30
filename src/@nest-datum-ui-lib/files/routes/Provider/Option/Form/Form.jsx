import React from 'react';
import FilesDialogProviderOptionDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Option/Drop';
import FilesFormProviderOption from '@nest-datum-ui-lib/files/components/Form/Provider/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogProviderOptionDrop />
		<FilesFormProviderOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
