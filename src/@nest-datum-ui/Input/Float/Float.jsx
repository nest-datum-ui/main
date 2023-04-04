import React from 'react';
import PropTypes from 'prop-types';
import { float as utilsValidateFloat } from '@nest-datum-utils/validate';
import StyledWrapper from './Styled/Wrapper.jsx';

let Float = ({
	storeName,
	onInput,
	label,
	placeholder,
	...props
}) => {
	const onInputLocal = React.useCallback((e) => {
		e.target.value = utilsValidateFloat(e.target.value);
		onInput(e);
	}, [
		onInput,
	]);

	return <StyledWrapper 
		label={label}
		placeholder={String(placeholder)}
		onInput={onInputLocal}
		{ ...props }
		type="text" />;
};

Float = React.memo(Float);
Float.defaultProps = {
	onInput: () => {},
	label: 'Float number',
	placeholder: '0.001',
};
Float.propTypes = {
	onInput: PropTypes.func,
};

export default Float;
