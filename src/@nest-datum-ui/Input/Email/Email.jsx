import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './Styled/Wrapper.jsx';

let Email = ({ 
	storeName,
	onInput,
	...props 
}) => {
	const onInputLocal = React.useCallback((e) => {
		e.target.value = e.target.value.toLowerCase().replace(/[^a-zа-я0-9.@_-]+/g, '');
		onInput(e);
	}, [
		onInput,
	]);

	return <StyledWrapper
		{ ...props }
		onInput={onInputLocal}
		type="email" />;
};

Email = React.memo(Email);
Email.defaultProps = {
	name: 'email',
	label: 'Email',
	placeholder: 'name@email.com',
	onInput: () => {},
};
Email.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Email;
