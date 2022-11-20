import React from 'react';
import PropTypes from 'prop-types';
import ruLocale from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Input from '@nest-datum-ui/components/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

let InputDate = ({
	error,
	label,
	helperText,
	placeholder,
	value,
	defaultValue,
	onChange,
	...props
}) => {
	const [ valueState, setValueState ] = React.useState(() => value || defaultValue);
	const _onChange = React.useCallback((newDate) => {
		setValueState((currentDate) => {
			onChange({ 
				target: {
					value: newDate,
				},
				currentTarget: {
					value: newDate,
				}, 
			});

			return newDate;
		});
	}, [
		setValueState,
		onChange,
	]);

	return <React.Fragment>
		<LocalizationProvider 
			dateAdapter={AdapterDateFns}
			adapterLocale={ruLocale}>
			<MobileDatePicker
				toolbarTitle="Select date"
				inputFormat="dd.MM.yyyy"
				onChange={_onChange}
				value={valueState}
				renderInput={({ error, ...params }) => {
					return <Input 
						fullWidth
						{...params} />;
				}}
				{ ...props } />
		</LocalizationProvider>
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
	</React.Fragment>;
};

InputDate = React.memo(InputDate);
InputDate.defaultProps = {
	onChange: () => {},
};
InputDate.propTypes = {
	onChange: PropTypes.func,
};

export default InputDate;
