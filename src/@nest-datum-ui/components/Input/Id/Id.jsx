import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import InputText from '@nest-datum-ui/components/Input/Text';

let Id = ({ 
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
				label="id"
				helperText="Unique identificator"
				placeholder="For example: test-entity-id"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Id = React.memo(Id);
Id.defaultProps = {
	name: 'id',
};
Id.propTypes = {
	storeFormName: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default Id;
