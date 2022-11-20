import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

let Input = ({
	id,
	error,
	color,
	...props
}) => {
	return <React.Fragment>
		<TextField
			fullWidth
			{...id
				? { id: id.toString() }
				: {}}
			{...props}
			error={!!error}
			{...error
				? { helperText: error }
				: {}} />
	</React.Fragment>;
};
Input = React.memo(Input);
Input.defaultProps = {
};
Input.propTypes = {
	name: PropTypes.string,
	error: PropTypes.string,
	color: PropTypes.string,
};

export default Input;
