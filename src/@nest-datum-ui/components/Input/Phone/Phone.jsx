import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IMaskInput } from 'react-imask';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Input from '@nest-datum-ui/components/Input';

let Mask = (props, ref) => {
	return <React.Fragment>
		<IMaskInput
			overwrite
			inputRef={ref}
			mask={'+(####) 00-000-00-00'}
			definitions={{
				'#': /[0-9]/,
			}}
			{...props} />
	</React.Fragment>;
};

Mask = React.memo(React.forwardRef(Mask));
Mask.defaultProps = {
};

let Phone = ({
	onInput,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'phone'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const [ country/*, setCountry*/ ] = React.useState('US');
	const _onInput = React.useCallback((e) => {
		// utilsValidateFloat(e);
		onInput(e);
	}, [
		onInput,
	]);
	const _onCountriesOpen = React.useCallback((e) => {

	}, [
	]);

	return <React.Fragment>
		<Input 
			label={dataTypeLabel}
			placeholder={(dataTypePlaceholder || '').toString()}
			onInput={_onInput}
			{ ...props }
			type="text"
			InputProps={{
				inputComponent: Mask,
				endAdornment: <InputAdornment
					position="end"
					style={{
						position: 'absolute',
						right: '24px',
						color: 'inherit',
					}}>
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '40px',
							width: '28px',
							height: '28px',
							overflow: 'hidden',
							borderRadius: '50%',
						}}
					>
						{country.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))}
					</span>
					<IconButton
						size="small"
						onClick={_onCountriesOpen}>
						<KeyboardArrowDownIcon />
					</IconButton>
				</InputAdornment>,
			}} />
	</React.Fragment>;
};

Phone = React.memo(Phone);
Phone.defaultProps = {
	onInput: () => {},
};
Phone.propTypes = {
	onInput: PropTypes.func,
};

export default Phone;
