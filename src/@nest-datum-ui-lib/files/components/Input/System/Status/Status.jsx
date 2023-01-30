import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { FILES_PATH_SYSTEM } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FilesSelectSystemStatus from '@nest-datum-ui-lib/files/components/Select/System/Status';

let Status = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'systemStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'systemStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'systemStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<FilesSelectSystemStatus
				disabled={loader}
				name="systemStatusId"
				label="System status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	storeFormName: FILES_PATH_SYSTEM,
};
Status.propTypes = {
	storeFormName: PropTypes.string,
};

export default Status;
