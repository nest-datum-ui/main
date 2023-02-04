import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { DATA_TYPE_PATH_TYPE } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DataTypeSelectType from '@nest-datum-ui-lib/data-type/components/Select/Type';

let Type = ({ 
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
		<Box 
			py={2}
			maxWidth="240px">
			<DataTypeSelectType
				disabled={loader}
				name={name}
				label="Data type"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Type = React.memo(Type);
Type.defaultProps = {
	storeFormName: DATA_TYPE_PATH_TYPE,
	name: 'dataTypeId',
};
Type.propTypes = {
	storeFormName: PropTypes.string,
};

export default Type;
