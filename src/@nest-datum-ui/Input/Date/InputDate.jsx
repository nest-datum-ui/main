import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import { date as utilsValidateDate } from '@nest-datum-utils/validate';
import { str as utilsCheckStr } from '@nest-datum-utils/check';
import Input from '../Input.jsx';
import StyledWrapper from './Styled/Wrapper.jsx';

let InputDate = ({
	type,
	componentName,
	onChange, 
	value, 
	defaultValue, 
	error, 
	className,
	...props 
}) => {
	const [ state, setState ] = React.useState(() => undefined);
	const onChangeWrapper = React.useCallback((e) => setState(utilsValidateDate(e.target.value || '')), [
		setState,
	]);

	React.useEffect(() => {
		if (utilsCheckStr(state)) {
			onChange({ 
				target: {
					value: state,
				}, 
				currentTarget: {
					value: state,
				},
			});
		}
	}, [
		state,
		onChange,
	]);

	return <StyledWrapper className={className}>
		<InputMask { ...props }
			onChange={onChangeWrapper} 
			value={state ?? (value ?? defaultValue)}
			mask="99/9999"
			type="text">
			{(inputProps) => <Input { ...inputProps } />}
		</InputMask>
		{error
			&& <Typography
				component="div" 
				className="input-date-range__error-wrapper">
				{error}
			</Typography>}
	</StyledWrapper>;
};

InputDate = React.memo(InputDate);
InputDate.defaultProps = {
	onChange: () => {},
	type: 'date',
};
InputDate.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.number,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.number,
	]),
};

export default InputDate;
