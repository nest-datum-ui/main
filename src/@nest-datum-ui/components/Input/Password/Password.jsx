import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputText from '@nest-datum-ui/components/Input/Text';

let Password = ({ 
	storeFormName,
	name,
	...props 
}) => {
	const [ visible, setVisible ] = React.useState(() => false);
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, name ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', name ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, name, e.target.value)(), [
		storeFormName,
		name,
	]);
	const onVisible = React.useCallback((e) => setVisible((currentState) => !currentState), [
		setVisible,
	]);

	return <React.Fragment>
		<Box py={2}>
			<InputText
				disabled={loader}
				type={visible
					? 'text'
					: 'password'}
				name={name}
				label="Password"
				placeholder="min: 8 symbols"
				value={value}
				onChange={onChange}
				error={error}
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
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Password = React.memo(Password);
Password.defaultProps = {
	name: 'password',
};
Password.propTypes = {
	storeFormName: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default Password;
