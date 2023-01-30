import React from 'react';
import SsoDialogUserStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Status/Drop';
import SsoFormUserStatus from '@nest-datum-ui-lib/sso/components/Form/User/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogUserStatusDrop />
		<SsoFormUserStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
