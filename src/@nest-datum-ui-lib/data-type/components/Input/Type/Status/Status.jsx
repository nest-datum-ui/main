import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { DATA_TYPE_PATH_TYPE_STATUS } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DataTypeSelectTypeStatus from '@nest-datum-ui-lib/data-type/components/Select/Type/Status';

let Status = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'typeStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'typeStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'typeStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<DataTypeSelectTypeStatus
				disabled={loader}
				name="typeStatusId"
				label="Data type status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	storeFormName: DATA_TYPE_PATH_TYPE_STATUS,
};
Status.propTypes = {
	storeFormName: PropTypes.string,
};

export default Status;
