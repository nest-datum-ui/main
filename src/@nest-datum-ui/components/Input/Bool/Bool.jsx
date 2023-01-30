import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool';
import utilsCheckStrBool from '@nest-datum-ui/utils/check/str/bool.js';

let Bool = ({
	error,
	label,
	helperText,
	value,
	defaultValue,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'bool'));
	const dataTypeLabel = (dataType || {})['label'];

	return <React.Fragment>
		<Box>
			<FormControlLabel
				control={<Switch 
					{ ...props }
					{ ...utilsCheckStrBool(value)
						? { checked: (value === '0') ? false : true }
						: (utilsCheckBool(value) && ({ checked: value })) }
					{ ...utilsCheckStrBool(defaultValue)
						? { defaultChecked: (defaultValue === '0') ? false : true }
						: (utilsCheckBool(defaultValue) && ({ defaultChecked: defaultValue })) } />} 
				label={label ?? (dataTypeLabel || '')} />
			{(error || helperText)
				? <Box
					sx={{
						whiteSpace: 'nowrap',
					}}>
					{(error || helperText)
						? <Typography
							variant="caption"
							color={error
								? 'error'
								: 'textSecondary'}
							sx={{
								whiteSpace: 'initial',
								wordWrap: 'break-word',
							}}>
							{error || helperText}
						</Typography>
						: <React.Fragment />}
				</Box>
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

Bool = React.memo(Bool);
Bool.defaultProps = {
};
Bool.propTypes = {
	error: PropTypes.string,
	helperText: PropTypes.string,
};

export default Bool;
