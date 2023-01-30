import React from 'react';
import SsoDialogRoleStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Status/Drop';
import SsoFormRoleStatus from '@nest-datum-ui-lib/sso/components/Form/Role/Status';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogRoleStatusDrop />
		<SsoFormRoleStatus />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
