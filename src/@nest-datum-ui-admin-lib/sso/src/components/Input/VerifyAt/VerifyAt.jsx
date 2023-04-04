import React from 'react';
import PropTypes from 'prop-types';
import InputDateTime from '@nest-datum-ui/Input/DateTime';

let VerifyAt = (props) => {
	return <InputDateTime { ...props } />;
};

VerifyAt = React.memo(VerifyAt);
VerifyAt.defaultProps = {
	parentType: 'date',
	label: 'Email verified at',
	name: 'emailVerifiedAt',
};
VerifyAt.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
};

export default VerifyAt;
