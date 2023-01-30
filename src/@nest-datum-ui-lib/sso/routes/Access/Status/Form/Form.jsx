import React from 'react';
import SsoDialogAccessStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Status/Drop';
import SsoFormAccessStatus from '@nest-datum-ui-lib/sso/components/Form/Access/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogAccessStatusDrop />
		<SsoFormAccessStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
