import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FilesPaperPrimary from '@nest-datum-ui-lib/files/components/Paper/Primary';
import FilesSelectSystem from '@nest-datum-ui-lib/files/components/Select/System';
import FilesInputSelect from '@nest-datum-ui-lib/files/components/Input/Select';
import utilsCheckFileModel from '@nest-datum-ui/utils/check/file/model.js';

let UploadMemo = ({
	disabled,
	SystemSelectLabelProps,
	id,
	systemId,
	...props
}) => {
	const fetchedFileLoader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const onSystemId = React.useCallback((setState) => (e) => setState((currentState) => ({ 
		...currentState,
		systemId: e.target.value, 
		errorSystemId: '', 
		src: '',
		})), [
	]);

	return <React.Fragment>
		<FilesPaperPrimary 
			id={id}
			content={(props, state, setState) => <FilesInputSelect
				id={state['id']}
				systemId={state['systemId']}
				disabled={disabled} 
				{ ...props }>
				{(state['id']
					? (fetchedFileLoader === false && !props['unmount'])
					: true)
					? <Box 
						py={2}
						maxWidth="240px">
						<FilesSelectSystem
							name={`${state['id']}-systemId`}
							value={state['systemId']}
							onChange={onSystemId(setState)}
							label="Select system"
							error={state['errorSystemId']}
							disabled={disabled || fetchedFileLoader}
							{ ...SystemSelectLabelProps } />
					</Box>
					: <React.Fragment />}
			</FilesInputSelect>}>
		</FilesPaperPrimary>
	</React.Fragment>;
};

UploadMemo = React.memo(UploadMemo);
UploadMemo.defaultProps = {
};

let Upload = ({
	value,
	defaultValue,
	...props
}) => {
	const [ uniqueId ] = React.useState(() => uuidv4());
	const [ loaclValue ] = React.useState(() => utilsCheckFileModel(value)
		? value
		: (utilsCheckFileModel(defaultValue)
			? defaultValue
			: ({
				src: '',
				systemId: '',
				id: uniqueId,
			})));

	return <UploadMemo
		id={loaclValue['id']}
		systemId={loaclValue['systemId']}
		{ ...props } />;
};

Upload = React.memo(Upload);
Upload.defaultProps = {
	InputLabelProps: {},
	SystemSelectLabelProps: {},
	FileButtonLabelProps: {},
	buttonText: 'Select file',
	onChange: (() => {}),
};
Upload.propTypes = {
	InputLabelProps: PropTypes.object,
	SystemSelectLabelProps: PropTypes.object,
	FileButtonLabelProps: PropTypes.object,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	label: PropTypes.string,
	buttonText: PropTypes.string,
	onChange: PropTypes.func,
};

export default Upload;
