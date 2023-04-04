import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { int as utilsValidateInt } from '@nest-datum-utils/validate';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SelectCountry from '@nest-datum-ui/Select/Country';
import InputInt from '../Int';
import StyledWrapper from './Styled/Wrapper.jsx';

let Phone = ({
	storeName: propStoreName,
	name,
	onCountry,
	onChange,
	onInput,
	countryProps,
	value,
	countryDefaultValue,
	error,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName: contextStoreName } } } = React.useContext(ContextProps);
	const storeName = propStoreName ?? contextStoreName;
	const [ country, setCountry ] = React.useState(() => countryDefaultValue);
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const currentCountryData = (data || []).find((item) => item['phoneCode'] === country);
	const currentCountryDataMaxCount = Number((currentCountryData || {}).maxCount);
	const onInputWrapper = React.useCallback((e) => {
		e.target.value = utilsValidateInt(e.target.value);
		e.target.value = e.target.value.slice(0, currentCountryDataMaxCount);
		e.target['additionalValue'] = country;

		onInput(e);
		onChange(e);
	}, [
		currentCountryDataMaxCount,
		country,
		onInput,
		onChange,
	]);
	const onCountryWrapper = React.useCallback((e) => {
		e.target['additionalValue'] = e.target.value;
		
		onChange({ target: { value: '' }, currentTarget: { value: '' } });
		onCountry(e);
		setCountry(e.target.value);
	}, [
		setCountry,
		onCountry,
		onChange,
	]);

	return <StyledWrapper>
		<Grid container spacing={1}>
			<Grid
				item
				xs={4}>
				<SelectCountry 
					name={`input-phone__${name}`}
					value={country}
					onChange={onCountryWrapper}
					{ ...countryProps } />
			</Grid>
			<Grid
				item
				xs={true}>
				<InputInt { ...props } 
					name={name} 
					value={!country
						? ''
						: value}
					onInput={onInputWrapper} />
			</Grid>
		</Grid>
		{error
			&& <Typography
				component="div" 
				className="input-phone__error-wrapper">
				{error}
			</Typography>}
	</StyledWrapper>;
};

Phone = React.memo(Phone);
Phone.defaultProps = {
	name: 'phone',
	countryDefaultValue: '380',
	countryProps: { label: 'UA +380' },
	lebel: 'Phone',
	placeholder: 'Phone number',
	onInput: () => {},
	onCountry: () => {},
	onChange: () => {},
};
Phone.propTypes = {
	name: PropTypes.string.isRequired,
	lebel: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	onCountry: PropTypes.func,
	countryDefaultValue: PropTypes.string,
};

export default Phone;
