import React from 'react';
import FilesDialogProviderStatusDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Status/Drop';
import FilesFormProviderStatus from '@nest-datum-ui-lib/files/components/Form/Provider/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogProviderStatusDrop />
		<FilesFormProviderStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
