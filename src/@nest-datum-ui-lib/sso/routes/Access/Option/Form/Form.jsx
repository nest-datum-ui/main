import React from 'react';
import SsoDialogAccessOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Option/Drop';
import SsoFormAccessOption from '@nest-datum-ui-lib/sso/components/Form/Access/Option';
import Title from './Title';

let Form = () => {
	return <React.Fragment>
		<Title />
		<SsoDialogAccessOptionDrop />
		<SsoFormAccessOption />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
