import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import FilesPaperPrimary from '@nest-datum-ui-lib/files/components/Paper/Primary';
import FilesPaperPreview from '@nest-datum-ui-lib/files/components/Paper/Preview';
import FilesSelectSystem from '@nest-datum-ui-lib/files/components/Select/System';
import FilesInputSelect from '@nest-datum-ui-lib/files/components/Input/Select';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import onRead from './onRead.js';

let UploadMemo = ({
	id,
	name,
	uniqueId,
	disabled,
	SystemSelectLabelProps,
	FileButtonLabelProps,
	buttonText,
	onChange,
	...props
}) => {
	const previewRef = React.useRef();
	const fetchedFileLoader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const [ rendered, setRendered ] = React.useState(() => false);
	const [ fileState, setFileState ] = React.useState(() => ({
		systemId: '',
		errorSystemId: '',
	}));
	const system = useSelector(selectorFindArray([ 'api', 'list', 'filesSystemSelect', 'data' ], (item) => item['id'] === fileState['systemId']));
	const systemOptionPath = ((system || {})['systemSystemOptions'] || []).find((item) => item['systemOptionId'] === 'files-system-option-root');
	const systemOptionContentPath = ((system || [])['systemSystemSystemOptions'] || []).find((item) => item['systemSystemOptionId'] === (systemOptionPath || {})['id']);
	const systemPath = (systemOptionContentPath || {})['content'];
	const onSystemId = React.useCallback((e) => setFileState((currentState) => ({
		...currentState,
		systemId: e.target.value,
		errorSystemId: '',
		src: '',
		name: '',
		size: 0,
	})), [
		setFileState,
	]);
	const onFile = React.useCallback((event) => onRead({
		event,
		setFileState,
		setRendered,
		onChange,
		previewRef,
		systemPath,
	}), [
		setFileState,
		setRendered,
		onChange,
		previewRef,
		systemPath,
	]);

	return <React.Fragment>
		<FilesPaperPrimary 
			id={id}
			content={(props, state) => <React.Fragment>
				{(state['systemId'] 
					&& !fileState['systemId']
					&& !previewRef['mountStateFlag'])
					&& (() => {
						previewRef['mountStateFlag'] = true;

						setTimeout(() => setFileState((currentState) => ({
							...currentState,
							...state,
						})), 0);
					})()}
				<FilesInputSelect
					id={id}
					systemId={fileState['systemId'] || state['systemId']}
					disabled={disabled} 
					{ ...props }
					FileButtonLabelProps={{
						component: 'label',
						children: <React.Fragment>
							{buttonText}
							<input 
								id={`${(id || name)}-fileNode`}
								className={`${name}-fileNode`}
								name={(id || name)}
								type="file"
								onChange={onFile}
								style={{
									display: 'none',
								}} />
						</React.Fragment>,
						sx: {
							display: !!fileState['systemId']
								? 'inline-flex'
								: 'none',
						},
						...FileButtonLabelProps,
					}}>
					{(id
						? (fetchedFileLoader === false && !props['unmount'])
						: true)
						? <React.Fragment>
							<Box 
								py={2}
								maxWidth="240px">
								<FilesSelectSystem
									name={`${id}-systemId`}
									value={fileState['systemId'] || state['systemId']}
									onChange={onSystemId}
									label="Select system"
									error={fileState['errorSystemId']}
									disabled={disabled || fetchedFileLoader}
									{ ...SystemSelectLabelProps } />
							</Box>
							{(fileState['systemId']
								&& fileState['src'])
								? <FilesPaperPreview 
									wrapperRef={previewRef}
									rendered={rendered}
									id={id}
									src={fileState['src']}
									name={fileState['name']}
									size={fileState['size']} />
								: <React.Fragment />}
						</React.Fragment>
						: <React.Fragment />}
				</FilesInputSelect>
			</React.Fragment>}>
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
	const [ valueMemo ] = React.useState(() => utilsCheckStr(value)
		? value
		: (utilsCheckStr(defaultValue)
			? defaultValue
			: ''));

	return <UploadMemo
		uniqueId={uniqueId}
		id={valueMemo}
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
	name: PropTypes.string,
	label: PropTypes.string,
	buttonText: PropTypes.string,
	onChange: PropTypes.func,
};

export default Upload;
