import React from 'react';
import PropTypes from 'prop-types';
import { name as utilsValidateName } from '@nest-datum-utils/validate';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InputText from '@nest-datum-ui/Input/Text';

let Login = ({ onInput, displayStartIcon, InputProps: { startAdornment, ...InputProps }, ...props }) => {
	const onInputWrapper = React.useCallback((e) => {
		e.target.value = utilsValidateName(e.target.value);
		onInput(e);
	}, [
		onInput,
	]);

	return <InputText 
		onInput={onInputWrapper} 
		placeholder="john95"
		label="Login"
		InputProps={{
			...(displayStartIcon === true && startAdornment)
				? { startAdornment }
				: {},
			...InputProps,
		}}
		{ ...props } />;
};

Login = React.memo(Login);
Login.defaultProps = {
	name: 'login',
	onInput: () => {},
	displayStartIcon: false,
	InputProps: {
		startAdornment: <InputAdornment position="start">
			<AlternateEmailIcon />
		</InputAdornment>,
	},
};
Login.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	displayStartIcon: PropTypes.bool,
};

export default Login;
