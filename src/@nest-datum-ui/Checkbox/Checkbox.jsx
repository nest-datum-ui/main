import React from 'react';
import {
	func as utilsCheckFunc,
	exists as utilsCheckExists,
} from '@nest-datum-utils/check';
import MuiCheckbox from '@mui/material/Checkbox';
import StyledWrapper from './Styled/Wrapper.jsx';

let Checkbox = ({ 
	storeName,
	type, 
	label, 
	onChange, 
	value, 
	defaultValue, 
	...props 
}) => {
	if (utilsCheckFunc(onChange) 
		&& (utilsCheckExists(props['checked']) 
			|| utilsCheckExists(props['defaultChecked'])
			|| utilsCheckExists(props['value'])
			|| utilsCheckExists(props['defaultValue']))) {
		props['checked'] = Boolean(props['checked'] ?? props['defaultChecked'] ?? props['value'] ?? props['defaultValue']);
	}
	else {
		props['defaultChecked'] = Boolean(props['checked'] ?? props['defaultChecked'] ?? props['value'] ?? props['defaultValue']);
	}
	if (utilsCheckExists(props['checked']) && utilsCheckExists(props['defaultChecked'])) {
		delete props['defaultChecked'];
	}

	return <StyledWrapper 
		label={label} 
		control={<MuiCheckbox 
			{ ...props } 
			onChange={onChange} />} />;
};

Checkbox = React.memo(Checkbox);
Checkbox.defaultProps = {
	type: 'checkbox',
};
Checkbox.propTypes = {
};

export default Checkbox;
