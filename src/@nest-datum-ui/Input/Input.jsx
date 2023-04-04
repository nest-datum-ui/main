import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './Styled/Wrapper.jsx';

let Input = ({
	storeName,
	id,
	error,
	color,
	form,
	...props
}) => {
	return <StyledWrapper
		fullWidth
		{ ...id
			? { id: id.toString() }
			: {} }
		{ ...form
			? { inputProps: { form } }
			: {} }
		{ ...props }
		error={!!error}
		{ ...error
			? { helperText: error }
			: {} } />;
};
Input = React.memo(Input);
Input.defaultProps = {
};
Input.propTypes = {
	name: PropTypes.string,
	error: PropTypes.string,
	color: PropTypes.string,
	form: PropTypes.string,
};

export default Input;
