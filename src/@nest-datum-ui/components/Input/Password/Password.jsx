import React from 'react';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from '@nest-datum-ui/components/Input';

let Password = (props) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'password'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const [ visible, setVisible ] = React.useState(() => false);
	const onVisible = React.useCallback((e) => {
		setVisible((currentState) => !currentState);
	}, [
		setVisible,
	]);

	return <React.Fragment>
		<Input 
			label={dataTypeLabel}
			placeholder={dataTypePlaceholder}
			InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton 
						onClick={onVisible}
						edge="end">
						{visible
							? <VisibilityOffIcon />
							: <VisibilityIcon />}
					</IconButton>
				</InputAdornment>,
			}}
			{ ...props }
			type={visible
				? 'text'
				: 'password'} />
	</React.Fragment>;
};

Password = React.memo(Password);
Password.defaultProps = {
	onInput: () => {},
};
Password.propTypes = {
};

export default Password;
