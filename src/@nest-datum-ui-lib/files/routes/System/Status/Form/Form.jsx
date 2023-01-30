import React from 'react';
import FilesDialogSystemStatusDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Status/Drop';
import FilesFormSystemStatus from '@nest-datum-ui-lib/files/components/Form/System/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<FilesDialogSystemStatusDrop />
		<FilesFormSystemStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
