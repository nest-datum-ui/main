import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import InputText from '@nest-datum-ui/components/Input/Text';

let Email = ({ 
	storeFormName,
	name,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, name ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', name ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, name, e.target.value)(), [
		storeFormName,
		name,
	]);
	const onInput = React.useCallback((e) => {
		e.target.value = e.target.value.toLowerCase().replace(/[^a-zа-я0-9.@_-]+/g, '');
	}, [
	]);

	console.log('value', storeFormName, name, value);

	return <React.Fragment>
		<Box py={2}>
			<InputText
				disabled={loader}
				type="email"
				name={name}
				label="Email"
				placeholder="name@email.com"
				value={value}
				onChange={onChange}
				error={error}
				onInput={onInput}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Email = React.memo(Email);
Email.defaultProps = {
	name: 'email',
};
Email.propTypes = {
	storeFormName: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default Email;
