import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FILES_PATH_FILE,
	FILES_PATH_FOLDER, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilesPaperById from '@nest-datum-ui-lib/files/components/Paper/ById';
import FilesDialogManager from '@nest-datum-ui-lib/files/components/Dialog/Manager';

let Select = ({
	disabled,
	label,
	value,
	defaultValue,
	onChange,
	onManagerOpen,
	...props
}) => {
	const [ valueMemo, setValueMemo ] = React.useState(() => utilsCheckStr(value)
		? value
		: (utilsCheckStr(defaultValue)
			? defaultValue
			: ''));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${valueMemo}`, 'systemId' ]));
	const onManager = React.useCallback((e) => {
		actionDialogOpen(`${FILES_PATH_FOLDER}/manager`)();
		onManagerOpen(e);
	}, [
		onManagerOpen,
	]);
	const onChangeLocal = React.useCallback((e, props) => {
		actionDialogClose(`${FILES_PATH_FOLDER}/manager`)();
		setValueMemo(e.target.value);
		onChange(e, props);
	}, [
		onChange,
	]);
	
	React.useEffect(() => {
		if (valueMemo && !systemId) {
			actionApiFormGet(() => `${FILES_PATH_FILE}/${valueMemo}`, { entityId: valueMemo })();
		}
	}, [
		valueMemo,
		systemId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(`${FILES_PATH_FILE}/${valueMemo}`)();
	}, [
		valueMemo,
	]);

	return <React.Fragment>
		<Button
			disableElevation
			variant="contained"
			color="primary"
			disabled={disabled}
			startIcon={<InsertDriveFileIcon />}
			onClick={onManager}>
			{label}
		</Button>
		{valueMemo
			&& <Box 
				maxWidth="128px"
				pt={1}>
				<FilesPaperById>
					{valueMemo}
				</FilesPaperById>
			</Box>}
		<FilesDialogManager onChange={onChangeLocal} />
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
	label: 'Select file',
	onChange: (() => {}),
	onManagerOpen: (() => {}),
};
Select.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	label: PropTypes.string,
	onChange: PropTypes.func,
	onManagerOpen: PropTypes.func,
};

export default Select;
