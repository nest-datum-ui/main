import React from 'react';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import TypographyHelperText from '@nest-datum-ui/Typography/HelperText';

let DateTime = ({
	type,
	storeName,
	inputFormat,
	error,
	label,
	helperText,
	placeholder,
	value,
	defaultValue,
	onChange,
	...props
}) => {
	const [ valueState, setValueState ] = React.useState(() => defaultValue
		|| value 
		|| '');
	const onChangeWrapper = React.useCallback((newDate) => {
		const newState = { 
			target: {
				value: newDate,
			},
			currentTarget: {
				value: newDate,
			}, 
		};

		setValueState(newDate);
		onChange(newState);
	}, [
		setValueState,
		onChange,
	]);

	return <React.Fragment>
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileDateTimePicker
				ampm={false}
				inputFormat={inputFormat}
				views={[
					'day',
					'hours', 
					'minutes', 
					'seconds',
				]}
				label={label}
				placeholder={placeholder}
				onChange={onChangeWrapper}
				value={valueState}
				renderInput={({ error, ...params }) => {
					return <TextField 
						fullWidth
						size="small"
						{...params} />;
				}}
				{ ...props } />
		</LocalizationProvider>
		<TypographyHelperText
			error={error}
			helperText={helperText} />
	</React.Fragment>;
};

DateTime = React.memo(DateTime);
DateTime.defaultProps = {
	type: 'date',
	inputFormat: 'dd.MM.yyyy HH:mm:ss',
	label: 'Select date and time',
	placeholder: '01.01.2023 00:00:00',
	onChange: () => {},
};
DateTime.propTypes = {
	inputFormat: PropTypes.string,
	error: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	helperText: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
};

export default DateTime;
