import React from 'react';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import TextField from '@mui/material/TextField';
import TypographyHelperText from '@nest-datum-ui/Typography/HelperText';

let Time = ({
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
	const [ valueState, setValueState ] = React.useState(() => defaultValue || value);
	const onChangeLocal = React.useCallback((newDate) => setValueState((currentDate) => onChange({ 
		target: {
			value: newDate,
		},
		currentTarget: {
			value: newDate,
		}, 
	})), [
		setValueState,
		onChange,
	]);

	return <React.Fragment>
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileTimePicker
				ampm={false}
				inputFormat={inputFormat}
				views={[
					'hours', 
					'minutes', 
					'seconds',
				]}
				label={label}
				placeholder={placeholder}
				onChange={onChangeLocal}
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

Time = React.memo(Time);
Time.defaultProps = {
	inputFormat: 'HH:mm:ss',
	label: 'Select time',
	placeholder: '00:00:00',
	onChange: () => {},
};
Time.propTypes = {
	error: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	helperText: PropTypes.string,
	onSource: PropTypes.func,
	onHelp: PropTypes.func,
	valuePath: PropTypes.func,
	value: PropTypes.object,
	defaultValue: PropTypes.object,
	onChange: PropTypes.func,
};

export default Time;
