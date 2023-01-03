import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilesPaperPrimary from '@nest-datum-ui-lib/files/components/Paper/Primary';
import FilesDialogManageList from '@nest-datum-ui-lib/files/components/Dialog/Manage/List';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';

let SelectMemo = ({
	id,
	uniqueId,
	disabled,
	label,
	buttonText,
	InputLabelProps,
	SystemSelectLabelProps,
	FileButtonLabelProps,
	onChange,
	select,
	selectSeveral,
	name,
	children,
	...props
}) => {
	const [ valueMemo, setValueMemo ] = React.useState(() => id || '');
	const onOpen = React.useCallback((e) => {
		actionDialogOpen('filesManageList')();
	}, [
	]);
	const onUpdate = React.useCallback((e) => {
		setValueMemo((currentState) => {
			setTimeout(() => onChange(e), 0);

			return selectSeveral
				? ''
				: e.target.value;
		});
	}, [
		setValueMemo,
		onChange,
		selectSeveral,
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
				{FileButtonLabelProps['children']
					? <Button
						variant="contained"
						color="primary"
						startIcon={<InsertDriveFileIcon />}
						disabled={disabled}
						disableElevation
						{ ...select
							? { onClick: onOpen }
							: {} }
						{ ...FileButtonLabelProps } />
					: <Button
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
					</Button>}
			</Box>
		</div>
		{select
			? <React.Fragment>
				<FilesDialogManageList 
					onChange={onUpdate}
					selectSeveral={selectSeveral} />
				{valueMemo
					? <FilesPaperPrimary id={valueMemo} />
					: <React.Fragment />}
			</React.Fragment>
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
	const [ valueMemo ] = React.useState(() => utilsCheckStr(value)
		? value
		: (utilsCheckStr(defaultValue)
			? defaultValue
			: ''));

	return <SelectMemo
		uniqueId={uniqueId}
		id={valueMemo}
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
	selectSeveral: false,
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
	selectSeveral: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Select;
