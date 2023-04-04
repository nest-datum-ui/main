import React from 'react';
import InputText from '@nest-datum-ui/Input/Text';

let Description = (props) => {
	return <InputText { ...props } />;
};

Description = React.memo(Description);
Description.defaultProps = {
	label: 'Description',
	placeholder: 'Text...',
	multiline: true,
	rows: 3,

};
Description.propTypes = {
};

export default Description;
