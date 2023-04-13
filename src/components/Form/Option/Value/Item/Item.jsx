import React from 'react';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import {
	actionApiFormDropOption,
	actionApiFormCreateOption,
} from '@nest-datum-ui/Store';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Field from '@nest-datum-ui/Field';
import InputMixed from '@nest-datum-ui/Input/Mixed';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import StyledWrapper from './Styled/Wrapper.jsx';

let Item = ({
	value,
	option,
	optionValue,
	optionIndex,
	optionValueIndex,
	optionLength,
	optionValueLength,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				optionListName,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const {
		[serviceName]: { 
			[optionListName]: {
				storeName, 
				entityRelation, 
				relation, 
				relationContent, 
			},
		},
	} = React.useContext(ContextProps);
	const id = React.useMemo(() => value.id, [
		value,
	]);
	const onDrop = React.useCallback(() => {
		actionApiFormDropOption(storeName, {
			id,
			relation,
			relationContent,
			optionIndex,
			optionValueIndex,
			entityRelationId: option[entityRelation],
		});
	}, [
		storeName,
		id,
		relation,
		relationContent,
		optionIndex,
		optionValueIndex,
		option,
		entityRelation,
	]);
	const onAdd = React.useCallback(() => actionApiFormCreateOption(storeName, {
		id,
		relation,
		relationContent,
	}), [
		storeName,
		id,
		relation,
		relationContent,
	]);

	return <StyledWrapper>
		<Grid container spacing={3}>
			<Grid
				item
				xs={true}>
				<Field
					Component={InputMixed}
					storeName={option.id}
					form={option.id}
					label={value.name}
					name={optionValue.id}
					dataTypeId={value.dataTypeId}
					defaultValue={optionValue.content || value.defaultValue}
					required={value.isRequired} />
			</Grid>
			{(value.isMultiline === true && optionValueLength > 1)
				&& <Grid
					item
					xs={false}>
					<IconButton color="error" onClick={onDrop}>
						<CloseIcon color="error" />
					</IconButton>
				</Grid>}
		</Grid>
		{(value.isMultiline && optionValueIndex === (optionValueLength <= 0 ? 0 : (optionValueLength - 1)))
			&& <ButtonPrimary color="primary" size="small" startIcon={<AddIcon />} onClick={onAdd}>
				Add field
			</ButtonPrimary>}
	</StyledWrapper>;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
};

export default Item;
