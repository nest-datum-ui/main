import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

let Time = ({
	error,
	label,
	helperText,
	placeholder,
	value,
	defaultValue,
	onChange,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'time'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];

	const [ valueState, setValueState ] = React.useState(() => defaultValue
		|| value);
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
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileTimePicker
				ampm={false}
				inputFormat="HH:mm:ss"
				views={[
					'hours', 
					'minutes', 
					'seconds',
				]}
				label={label || dataTypeLabel}
				placeholder={placeholder || dataTypePlaceholder}
				onChange={_onChange}
				value={valueState}
				renderInput={({ error, ...params }) => {
					return <TextField 
						fullWidth
						size="small"
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

Time = React.memo(Time);
Time.defaultProps = {
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
