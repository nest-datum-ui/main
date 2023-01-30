import React from 'react';
import SsoDialogUserDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Drop';
import SsoFormUser from '@nest-datum-ui-lib/sso/components/Form/User';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogUserDrop />
		<SsoFormUser />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
