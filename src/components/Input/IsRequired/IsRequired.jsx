import React from 'react';
import InputBool from '@nest-datum-ui/Input/Bool';

let IsRequired = (props) => {
	return <InputBool { ...props } />;
};

IsRequired = React.memo(IsRequired);
IsRequired.defaultProps = {
	label: 'Required to fill',

};
IsRequired.propTypes = {
};

export default IsRequired;
