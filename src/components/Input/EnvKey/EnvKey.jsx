import React from 'react';
import InputText from '@nest-datum-ui/Input/Text';

let EnvKey = (props) => {
	return <InputText { ...props } />;
};

EnvKey = React.memo(EnvKey);
EnvKey.defaultProps = {
	label: 'Env key',
	placeholder: 'Environment constant name',

};
EnvKey.propTypes = {
};

export default EnvKey;
