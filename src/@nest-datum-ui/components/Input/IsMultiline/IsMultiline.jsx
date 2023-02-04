import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import InputBool from '@nest-datum-ui/components/Input/Bool';

let IsMultiline = ({ 
	storeFormName,
	name,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, name ]));
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', name ]));
	const onChange = React.useCallback((e, newValue) => actionApiFormProp(storeFormName, name, newValue)(), [
		storeFormName,
		name,
	]);

	return <React.Fragment>
		<Box py={2}>
			<InputBool
				disabled={loader}
				name={name}
				label="Multidimensional value"
				value={!!value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

IsMultiline = React.memo(IsMultiline);
IsMultiline.defaultProps = {
	name: 'isMultiline'
};
IsMultiline.propTypes = {
	storeFormName: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default IsMultiline;
