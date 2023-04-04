import React from 'react';
import PropTypes from 'prop-types';
import InputText from '@nest-datum-ui/Input/Text';

let VerifyKey = (props) => {
	return <InputText { ...props } />;
};

VerifyKey = React.memo(VerifyKey);
VerifyKey.defaultProps = {
	name: 'emailVerifyKey',
	label: 'Email verify key',
};
VerifyKey.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
};

export default VerifyKey;
