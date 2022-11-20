import React from 'react';
import PropTypes from 'prop-types';
import ruLocale from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Input from '@nest-datum-ui/components/Input';

let Year = ({
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
				openTo="year"
				views={[ 'year' ]}
				toolbarTitle="Select date"
				inputFormat="yyyy"
				onChange={_onChange}
				value={valueState}
				renderInput={({ error, ...params }) => {
					return <Input 
						fullWidth
						{...params} />;
				}}
				{ ...props } />
		</LocalizationProvider>
	</React.Fragment>;
};

Year = React.memo(Year);
Year.defaultProps = {
	onChange: () => {},
};
Year.propTypes = {
	onChange: PropTypes.func,
};

export default Year;
