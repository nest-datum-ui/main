import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StyledWrapper from './Styled/Wrapper.jsx';

let Password = ({ storeName, visibility, ...props }) => {
	const [ visible, setVisible ] = React.useState(() => false);
	const onVisible = React.useCallback((e) => setVisible((currentState) => !currentState), [
		setVisible,
	]);

	return <StyledWrapper
		{ ...props }
		{ ...visibility
			? {
				InputProps: {
					endAdornment: <InputAdornment position="end">
						<IconButton 
							onClick={onVisible}
							edge="end">
							{visible
								? <VisibilityOffIcon />
								: <VisibilityIcon />}
						</IconButton>
					</InputAdornment>,
				},
			}
			: {} }
		type={visible
			? 'text'
			: 'password'} />;
};

Password = React.memo(Password);
Password.defaultProps = {
	name: 'password',
	label: 'Password',
	placeholder: 'min: 8 symbols',
	visibility: false,
};
Password.propTypes = {
	visibility: PropTypes.bool,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Password;
