import React from 'react';
import SsoDialogRoleOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Option/Drop';
import SsoFormRoleOption from '@nest-datum-ui-lib/sso/components/Form/Role/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogRoleOptionDrop />
		<SsoFormRoleOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
