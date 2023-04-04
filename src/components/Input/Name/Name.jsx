import React from 'react';
import InputText from '@nest-datum-ui/Input/Text';

let Name = (props) => {
	return <InputText { ...props } />;
};

Name = React.memo(Name);
Name.defaultProps = {
	label: 'Name',
	placeholder: 'For example: Test status',
};
Name.propTypes = {
};

export default Name;
