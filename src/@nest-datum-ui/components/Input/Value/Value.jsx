import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckStrDataTypeBool from '@nest-datum-ui/utils/check/str/dataType/bool.js';
import Box from '@mui/material/Box';
import MixedValue from '@nest-datum-ui/components/Form/MixedValue';

let Value = ({ 
	storeFormName,
	name,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'dataTypeId' ])) || '';
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, name ]));
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', name ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, name, utilsCheckStrDataTypeBool(dataTypeId)
		? e.target.checked
		: e.target.value)(), [
		dataTypeId,
		storeFormName,
		name,
	]);

	return dataTypeId && <React.Fragment>
			<Box py={2}>
				<MixedValue 
					loader={loader}
					stateNameForm={storeFormName}
					onChange={onChange}
					dataTypeId={dataTypeId}
					value={value}
					error={error}
					name={name}
					{ ...props } />
			</Box>
		</React.Fragment>;
};

Value = React.memo(Value);
Value.defaultProps = {
	name: 'value',
	label: 'Value',
};
Value.propTypes = {
	storeFormName: PropTypes.string.isRequired,
};

export default Value;
