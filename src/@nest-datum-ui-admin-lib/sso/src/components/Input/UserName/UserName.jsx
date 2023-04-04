import React from 'react';
import PropTypes from 'prop-types';
import { userName as utilsValidateUserName } from '@nest-datum-utils/validate';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import StyledWrapper from './Styled/Wrapper.jsx';

let UserName = ({ onInput, ...props }) => {
	const onInputWrapper = React.useCallback((e) => {
		e.target.value = utilsValidateUserName(e.target.value);
		onInput(e);
	}, [
		onInput,
	]);

	return <StyledWrapper { ...props } onInput={onInputWrapper} />;
};

UserName = React.memo(UserName);
UserName.defaultProps = {
	onInput: () => {},
	InputProps: {
		startAdornment: <InputAdornment position="start">
			<PersonIcon />
		</InputAdornment>,
	},
};
UserName.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default UserName;
