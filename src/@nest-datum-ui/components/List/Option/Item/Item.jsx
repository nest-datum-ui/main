import React from 'react';
import PropTypes from 'prop-types';
import utilsCheckStrDataTypeBool from '@nest-datum-ui/utils/check/str/dataType/bool.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';
import ButtonCancelIcon from '@nest-datum-ui/components/Button/Cancel/Icon';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';

let Item = ({
	relationTableName,
	valueTableName,
	option,
	optionValue,
	index,
	optionIndex,
	optionValueIndex,
	optionLength,
	optionValueLength,
	id,
	name,
	description,
	dataTypeId,
	defaultValue,
	content,
	regex,
	isRequired,
	isMultiline,
	formFormOptions,
	onChange,
	onAdd,
	onDrop,
}) => {
	const onAddMemo = React.useCallback((e) => onAdd({
		id,
		relationTableName,
		valueTableName,
	}), [
		id,
		relationTableName,
		valueTableName,
		onAdd,
	]);
	const onDropMemo = React.useCallback((e) => onDrop({
		id,
		relationTableName,
		valueTableName,
		optionIndex,
		option, 
		optionValueIndex,
		optionValue,
	}), [
		id,
		relationTableName,
		valueTableName,
		optionIndex,
		optionValueIndex,
		option,
		optionValue,
		onDrop,
	]);
	const onChangeMemo = React.useCallback((e) => onChange({
		value: utilsCheckStrDataTypeBool(dataTypeId)
			? e.target.checked
			: e.target.value,
		id,
		relationTableName,
		valueTableName,
		dataTypeId,
		optionIndex,
		option, 
		optionValueIndex,
		optionValue,
	}), [
		id,
		relationTableName,
		valueTableName,
		dataTypeId,
		optionIndex,
		optionValueIndex,
		option,
		optionValue,
		onChange,
	]);

	return <React.Fragment>
		<Grid
			container
			spacing={3}
			alignItems="center">
			<Grid
				item
				xs={true}>
				<Box
					pt={2} 
					pb={1}>
					<InputMixed
						name={name}
						dataTypeId={dataTypeId}
						defaultValue={content || defaultValue}
						required={isRequired}
						onChange={onChangeMemo} />
				</Box>
			</Grid>
			{(isMultiline && optionValueLength > 1)
				&& <Grid
					item
					xs={false}>
						<ButtonCancelIcon onClick={onDropMemo} />
				</Grid>}
		</Grid>
		{(isMultiline && optionValueIndex === (optionValueLength <= 0 ? 0 : (optionValueLength - 1)))
			&& <ButtonCreate onClick={onAddMemo}>
				Add field
			</ButtonCreate>}
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	onChange: () => {},
	onAdd: () => {},
	onDrop: () => {},
};
Item.propTypes = {
	relationTableName: PropTypes.string.isRequired,
	valueTableName: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	dataTypeId: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	regex: PropTypes.string,
	isRequired: PropTypes.bool,
	isMultiline: PropTypes.bool,
	formFormOptions: PropTypes.array,
	onChange: PropTypes.func,
	onAdd: PropTypes.func,
	onDrop: PropTypes.func,
};

export default Item;
