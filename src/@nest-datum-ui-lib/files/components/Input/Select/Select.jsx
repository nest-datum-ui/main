import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilesDialogManageList from '@nest-datum-ui-lib/files/components/Dialog/Manage/List';
import utilsCheckFileModel from '@nest-datum-ui/utils/check/file/model.js';

let SelectMemo = ({
	disabled,
	label,
	buttonText,
	InputLabelProps,
	SystemSelectLabelProps,
	FileButtonLabelProps,
	id,
	systemId,
	onChange,
	select,
	name,
	children,
	...props
}) => {
	const onOpen = React.useCallback((e) => {
		actionDialogOpen('filesManageList')();
	}, [
	]);

	return <React.Fragment>
		<div>
			{label
				? <InputLabel { ...InputLabelProps }>
					{label}
				</InputLabel>
				: <React.Fragment />}
			{children
				? children
				: <React.Fragment />}
			<Box pb={2}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<InsertDriveFileIcon />}
					disabled={disabled}
					disableElevation
					{ ...select
						? { onClick: onOpen }
						: {} }
					{ ...FileButtonLabelProps }>
					{buttonText}
				</Button>
			</Box>
		</div>
		{select
			? <FilesDialogManageList />
			: <React.Fragment />}
	</React.Fragment>;
};

SelectMemo = React.memo(SelectMemo);
SelectMemo.defaultProps = {
};
SelectMemo.propTypes = {
};

let Select = ({
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

	return <SelectMemo
		id={loaclValue['id']}
		systemId={loaclValue['systemId']}
		{ ...props } />;
};

Select = React.memo(Select);
Select.defaultProps = {
	InputLabelProps: {},
	SystemSelectLabelProps: {},
	FileButtonLabelProps: {},
	buttonText: 'Select file',
	onChange: (() => {}),
	onOpen: (() => {}),
};
Select.propTypes = {
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
	select: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Select;
