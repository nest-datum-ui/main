import React from 'react';
import InputBool from '@nest-datum-ui/Input/Bool';

let IsMultiline = (props) => {
	return <InputBool { ...props } />;
};

IsMultiline = React.memo(IsMultiline);
IsMultiline.defaultProps = {
	label: 'Multidimensional value',

};
IsMultiline.propTypes = {
};

export default IsMultiline;
