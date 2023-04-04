import React from 'react';
import InputBool from '@nest-datum-ui/Input/Bool';

let IsNotDelete = (props) => {
	return <InputBool { ...props } />;
};

IsNotDelete = React.memo(IsNotDelete);
IsNotDelete.defaultProps = {
	label: 'Make entry unremovable',

};
IsNotDelete.propTypes = {
};

export default IsNotDelete;
