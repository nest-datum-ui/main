import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import InputText from '@nest-datum-ui/components/Input/Text';

let Key = ({ 
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

	return <React.Fragment>
		<Box py={2}>
			<InputText
				disabled={loader}
				name={name}
				label="Email verify key"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Key = React.memo(Key);
Key.defaultProps = {
	name: 'emailVerifyKey',
};
Key.propTypes = {
	storeFormName: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default Key;
