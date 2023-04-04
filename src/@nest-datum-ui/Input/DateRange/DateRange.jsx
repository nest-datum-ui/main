import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { date as utilsValidateDate } from '@nest-datum-utils/validate';
import Input from '../Input.jsx';
import StyledWrapper from './Styled/Wrapper.jsx';

let DateRange = ({ 
	storeName, 
	onChange, 
	value, 
	defaultValue, 
	error, 
	startInputProps, 
	endInputProps, 
	...props
}) => {
	const [ state, setState ] = React.useState(() => ({
		start: (value || {})['start'] || (defaultValue || {})['start'] || '',
		end: (value || {})['end'] || (defaultValue || {})['end'] || '',
		initialFlag: false,
	}));
	const stateStart = state.start;
	const stateEnd = state.end;
	const onChangeStart = React.useCallback((e) => {
		setState((currentState) => ({ ...currentState, start: utilsValidateDate(e.target.value, e.target) }));
	}, [
		setState,
	]);
	const onChangeEnd = React.useCallback((e) => {
		setState((currentState) => ({ ...currentState, end: utilsValidateDate(e.target.value, e.target) }));
	}, [
		setState,
	]);

	React.useEffect(() => {
		setState((currentState) => {
			if (currentState.initialFlag) {
				setTimeout(() => onChange({ 
					target: {
						value: ({ start: stateStart, end: stateEnd }),
					}, 
					currentTarget: {
						value: ({ start: stateStart, end: stateEnd }),
					},
				}), 0);

				return currentState;
			}
			return { ...currentState, initialFlag: true };
		});
	}, [
		stateStart,
		stateEnd,
		onChange,
	]);

	return <StyledWrapper {...props}>
		<Grid container spacing={1}>
			<Grid
				item
				xs={false}>
				<InputMask
					onChange={onChangeStart} 
					value={state.start}
					mask="99/9999">
					{(inputProps) => <Input { ...startInputProps } />}
				</InputMask>
			</Grid>
			<Grid
				item
				xs={false}>
				<InputMask
					onChange={onChangeEnd} 
					value={state.end}
					mask="99/9999">
					{(inputProps) => <Input { ...endInputProps } />}
				</InputMask>
			</Grid>
		</Grid>
		{error
			&& <Typography
				component="div" 
				className="input-date-range__error-wrapper">
				{error}
			</Typography>}
	</StyledWrapper>;
};

DateRange = React.memo(DateRange);
DateRange.defaultProps = {
	onChange: () => {},
	startInputProps: { placeholder: 'Start Date' },
	endInputProps: { placeholder: 'End Date' },
	componentName: 'DateRange',
};
DateRange.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.object,
	defaultValue: PropTypes.object,
	startInputProps: PropTypes.object,
	endInputProps: PropTypes.object,
};

export default DateRange;
