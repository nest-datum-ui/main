import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MiuSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

let Select = ({
	shrink,
	multiple,
	variant,
	name,
	value,
	defaultValue,
	required,
	disabled,
	label,
	helperText,
	error,
	onSource,
	onHelp,
	loader,
	children,
	...props
}) => {
	return <React.Fragment>
		<Box
			width="100%" 
			position="relative"
			paddingTop="6px">
			<FormControl 
				fullWidth 
				variant={variant}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}>
				<InputLabel
					shrink={shrink} 
					id={name} 
					size="small">
					{label}
				</InputLabel>
				<MiuSelect
					size="small"
					{ ...props }
					multiple={multiple}
					labelId={name}
					label={label}
					{ ...(typeof value === 'number' || typeof value === 'string' || (multiple && Array.isArray(value)))
						? { value }
						: ((typeof defaultValue === 'number' || typeof defaultValue === 'string' || (multiple && Array.isArray(defaultValue)))
							? { defaultValue }
							: { defaultValue: '' }) }>
					{loader
						? <MenuItem 
							disabled
							sx={{
								opacity: '1 !important',
							}}>
							<Box
								width="100%"
								height="100%"
								display="flex"
								alignItems="center"
								justifyContent="center">
								<CircularProgress size={40} />
							</Box>
						</MenuItem>
						: children}
				</MiuSelect>
				{(onHelp || error || helperText)
					? <FormHelperText 
						error={!!error}
						sx={{
							marginLeft: 0,
						}}>
						{onHelp
							? <IconButton 
								onClick={onHelp}
								sx={{
									padding: 4,
								}}>
								<HelpOutlineIcon
									sx={{
										fontSize: 12,
									}} />
							</IconButton>
							: <React.Fragment />}
						{error || helperText}
					</FormHelperText>
					: <React.Fragment />}
			</FormControl>
		</Box>
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
	loader: false,
	variant: 'outlined',
};
Select.propTypes = {
	error: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
	onChange: PropTypes.func,
	onSource: PropTypes.func,
	onHelp: PropTypes.func,
	loader: PropTypes.bool,
};

export default Select;
