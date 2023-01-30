import React from 'react';
import SsoDialogAccessDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Drop';
import SsoFormAccess from '@nest-datum-ui-lib/sso/components/Form/Access';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogAccessDrop />
		<SsoFormAccess />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
