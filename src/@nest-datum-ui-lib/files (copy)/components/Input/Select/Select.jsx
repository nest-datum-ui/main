import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { FILES_PATH_FILE } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilesPaper from '@nest-datum-ui-lib/files/components/Paper';

let Select = ({
	disabled,
	label,
	value,
	defaultValue,
	...props
}) => {
	const [ valueMemo ] = React.useState(() => utilsCheckStr(value)
		? value
		: (utilsCheckStr(defaultValue)
			? defaultValue
			: ''));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${valueMemo}`, 'loader' ]));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${valueMemo}`, 'systemId' ]));
	const path = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${valueMemo}`, 'path' ]));
	const size = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${valueMemo}`, 'size' ]));
	
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
			startIcon={<InsertDriveFileIcon />}>
			{label}
		</Button>
		<FilesPaper
			loader={loader || !systemId}
			path={path}
			size={size} />
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
	label: 'Select file',
	onChange: (() => {}),
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
};

export default Select;
