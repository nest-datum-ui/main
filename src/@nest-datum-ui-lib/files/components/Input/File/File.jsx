import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FilesInputSelect from '../Select';

let File = ({ 
	storeFormName,
	...props 
}) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'fileId' ])) || '';
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'fileId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		{value
			&& <Box py={2}>
				<FilesInputSelect
					name="fileId"
					label="File"
					value={value}
					onChange={onChange}
					{ ...props } />
			</Box>}
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
};
File.propTypes = {
	storeFormName: PropTypes.string.isRequired,
};

export default File;
