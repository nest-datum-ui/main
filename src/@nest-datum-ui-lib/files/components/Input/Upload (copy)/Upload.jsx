import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilesSelectSystem from '@nest-datum-ui-lib/files/components/Select/System';
import FilesPaperPreview from '@nest-datum-ui-lib/files/components/Paper/Preview';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckFileModel from '@nest-datum-ui/utils/check/file/model.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import onRead from './onRead.js';

let UploadMemo = ({
	disabled,
	label,
	buttonText,
	InputLabelProps,
	SystemSelectLabelProps,
	FileButtonLabelProps,
	id,
	systemId,
	onChange,
	name,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const previewRef = React.useRef();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const fetchedFileLoader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const fetchedFileSystemId = useSelector(selectorMainExtract([ 'api', 'form', id, 'systemId' ]));
	const [ rendered, setRendered ] = React.useState(() => false);
	const [ loaclValue, setLocalValue ] = React.useState(() => ({
		id,
		systemId,
		src: '',
	}));
	const system = useSelector(selectorFindArray([ 'api', 'list', 'filesSystemSelect', 'data' ], (item) => item['id'] === loaclValue['systemId']));
	const systemOptionPath = ((system || {})['systemSystemOptions'] || []).find((item) => item['systemOptionId'] === 'files-system-option-root');
	const systemOptionContentPath = ((system || [])['systemSystemSystemOptions'] || []).find((item) => item['systemSystemOptionId'] === (systemOptionPath || {})['id']);
	const systemPath = (systemOptionContentPath || {})['content'];
	const onChangeSystemId = React.useCallback((e) => setLocalValue((currentState) => ({ 
		...currentState,
		systemId: e.target.value, 
		errorSystemId: '', 
		src: '',
		})), [
		setLocalValue,
	]);
	const onFile = React.useCallback((event) => onRead({
		event,
		setLocalValue,
		setRendered,
		onChange,
		previewRef,
		systemPath,
	}), [
		setLocalValue,
		setRendered,
		onChange,
		previewRef,
		systemPath,
	]);

	React.useEffect(() => {
		if (!unmount && id) {
			actionApiFormGet({
				entityId: id,
				url: process.env.SERVICE_FILES,
				path: 'file',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		unmount,
		id,
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => {
		if (id && fetchedFileSystemId) {
			const fileData = Store()
				.getState()['api']
				.form[id];

			if (utilsCheckObj(fileData)) {
				setLocalValue((currentState) => ({
					...currentState,
					systemId: fileData['systemId'],
					src: fileData['path'],
					path: fileData['path'],
					name: fileData['name'],
					size: fileData['size'],
					type: fileData['type'],
				}));
			}
		}
	}, [
		id,
		fetchedFileSystemId,
		setLocalValue,
	]);

	return <React.Fragment>
		<div>
			{label
				? <InputLabel { ...InputLabelProps }>
					{label}
				</InputLabel>
				: <React.Fragment />}
			{(id
				? (fetchedFileLoader === false && !unmount)
				: true)
				? <Box 
					py={2}
					maxWidth="240px">
					<FilesSelectSystem
						name={`${id}-systemId`}
						value={loaclValue['systemId']}
						onChange={onChangeSystemId}
						label="Select system"
						error={loaclValue['errorSystemId']}
						disabled={disabled || fetchedFileLoader}
						{ ...SystemSelectLabelProps } />
				</Box>
				: <React.Fragment />}
			{loaclValue['systemId']
				? <React.Fragment>
					<Box pb={2}>
						<Button
							component="label"
							variant="contained"
							color="primary"
							startIcon={<InsertDriveFileIcon />}
							disabled={disabled || fetchedFileLoader}
							disableElevation
							{ ...FileButtonLabelProps }>
							{buttonText}
							<input 
								id={`${id}-fileNode`}
								className={`${name}-fileNode`}
								name={id}
								type="file"
								onChange={onFile}
								style={{
									display: 'none',
								}} />
						</Button>
					</Box>
					<FilesPaperPreview 
						wrapperRef={previewRef}
						rendered={rendered}
						id={loaclValue['id']}
						src={loaclValue['src']}
						name={loaclValue['name']}
						size={loaclValue['size']}
						loader={(typeof fetchedFileLoader === 'undefined' || unmount)} />
				</React.Fragment>
				: <React.Fragment />}
		</div>
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
