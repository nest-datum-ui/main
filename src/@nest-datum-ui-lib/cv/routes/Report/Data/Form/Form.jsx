import React from 'react';
import CvDialogReportDrop from '@nest-datum-ui-lib/cv/components/Dialog/Report/Drop';
import CvFormReport from '@nest-datum-ui-lib/cv/components/Form/Report';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<CvDialogReportDrop />
		<CvFormReport />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
