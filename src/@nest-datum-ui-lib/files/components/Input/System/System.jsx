import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { FILES_PATH_FILE } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FilesSelectSystem from '@nest-datum-ui-lib/files/components/Select/System';

let System = ({ 
	storeFormName,
	onChange,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'systemId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'systemId' ]));
	const onChangeLocal = React.useCallback((e) => {
		actionApiFormProp(storeFormName, 'systemId', e.target.value)();
		onChange(e);
	}, [
		storeFormName,
		onChange,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<FilesSelectSystem
				disabled={loader}
				name="systemId"
				label="System"
				value={value}
				onChange={onChangeLocal}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

System = React.memo(System);
System.defaultProps = {
	storeFormName: FILES_PATH_FILE,
	onChange: (() => {}),
};
System.propTypes = {
	storeFormName: PropTypes.string,
	onChange: PropTypes.func,
};

export default System;
