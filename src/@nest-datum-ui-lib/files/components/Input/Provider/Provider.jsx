import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { FILES_PATH_SYSTEM } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FilesSelectProvider from '@nest-datum-ui-lib/files/components/Select/Provider';

let Provider = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'providerId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'providerId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'providerId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<FilesSelectProvider
				disabled={loader}
				name="providerId"
				label="Provider"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
	storeFormName: FILES_PATH_SYSTEM,
};
Provider.propTypes = {
	storeFormName: PropTypes.string,
};

export default Provider;
