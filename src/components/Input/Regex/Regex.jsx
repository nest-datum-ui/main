import React from 'react';
import InputText from '@nest-datum-ui/Input/Text';

let Regex = (props) => {
	return <InputText { ...props } />;
};

Regex = React.memo(Regex);
Regex.defaultProps = {
	label: 'Regular expression',
	placeholder: 'For example: ^[0-9]+$',

};
Regex.propTypes = {
};

export default Regex;
