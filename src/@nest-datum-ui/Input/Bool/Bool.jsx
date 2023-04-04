import React from 'react';
import PropTypes from 'prop-types';
import {
	bool as utilsCheckBool,
	strBool as utilsCheckStrBool,
} from '@nest-datum-utils/check';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TypographyHelperText from '@nest-datum-ui/Typography/HelperText';
import StyledWrapper from './Styled/Wrapper.jsx';

let Bool = ({
	storeName,
	error,
	label,
	helperText,
	value,
	defaultValue,
	...props
}) => {
	return <StyledWrapper>
		<FormControlLabel
			label={label}
			control={<Switch 
				{ ...props }
				{ ...utilsCheckStrBool(value)
					? { checked: (value === '0') ? false : true }
					: (utilsCheckBool(value) && ({ checked: value })) }
				{ ...utilsCheckStrBool(defaultValue)
					? { defaultChecked: (defaultValue === '0') ? false : true }
					: (utilsCheckBool(defaultValue) && ({ defaultChecked: defaultValue })) } />} />
		<TypographyHelperText
			error={error}
			helperText={helperText} />
	</StyledWrapper>;
};

Bool = React.memo(Bool);
Bool.defaultProps = {
	label: 'Boolean value',
};
Bool.propTypes = {
	label: PropTypes.string,
	error: PropTypes.string,
	helperText: PropTypes.string,
};

export default Bool;
