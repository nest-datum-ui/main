import React from 'react';
import LensaDialogReportDrop from '@nest-datum-ui-lib/lensa/components/Dialog/Report/Drop';
import LensaFormReport from '@nest-datum-ui-lib/lensa/components/Form/Report';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<LensaDialogReportDrop />
		<LensaFormReport />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
