import React from 'react';
import CvDialogReportStatusDrop from '@nest-datum-ui-lib/cv/components/Dialog/Report/Status/Drop';
import CvFormReportStatus from '@nest-datum-ui-lib/cv/components/Form/Report/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<CvDialogReportStatusDrop />
		<CvFormReportStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
