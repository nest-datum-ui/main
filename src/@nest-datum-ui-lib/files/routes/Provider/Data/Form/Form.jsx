import React from 'react';
import FilesDialogProviderDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Drop';
import FilesFormProvider from '@nest-datum-ui-lib/files/components/Form/Provider';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogProviderDrop />
		<FilesFormProvider />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
