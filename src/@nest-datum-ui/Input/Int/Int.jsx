import React from 'react';
import PropTypes from 'prop-types';
import { int as utilsValidateInt } from '@nest-datum-utils/validate';
import StyledWrapper from './Styled/Wrapper.jsx';

let Int = ({
	storeName,
	onInput,
	label,
	placeholder,
	...props
}) => {
	const onInputLocal = React.useCallback((e) => {
		e.target.value = utilsValidateInt(e.target.value);
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

Int = React.memo(Int);
Int.defaultProps = {
	onInput: () => {},
	label: 'Integer number',
	placeholder: '0, 1, 2 ... n+1',
};
Int.propTypes = {
	onInput: PropTypes.func,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

export default Int;
