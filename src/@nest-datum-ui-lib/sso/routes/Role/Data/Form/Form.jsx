import React from 'react';
import SsoDialogRoleDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Drop';
import SsoFormRole from '@nest-datum-ui-lib/sso/components/Form/Role';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogRoleDrop />
		<SsoFormRole />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
