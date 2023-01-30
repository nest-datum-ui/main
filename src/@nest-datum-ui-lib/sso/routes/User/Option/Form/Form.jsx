import React from 'react';
import SsoDialogUserOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Option/Drop';
import SsoFormUserOption from '@nest-datum-ui-lib/sso/components/Form/User/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogUserOptionDrop />
		<SsoFormUserOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
