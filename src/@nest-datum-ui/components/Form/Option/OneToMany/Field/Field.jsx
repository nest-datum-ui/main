import React from 'react';
import PropTypes from 'prop-types';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Store from '@nest-datum-ui/components/Store';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';

let Item = ({
	storeName,
	id,
	optionIndex,
	valueIndex,
	content,
	allowDrop,
	...props
}) => {
	// TODO: вынести функцию в отдельный файл
	const onChange = React.useCallback((e) => {
		const values = [ ...(((Store()
			.getState()['api']
			.list[storeName]
			.data || [])[optionIndex] || {})
			.values || []) ];
		const valueIndex = values.findIndex((item) => item.id === id);

		actionApiListProp(storeName, 'data', e.target.value, [ 
			optionIndex, 
			'values', 
			valueIndex, 
			'content', 
		])();
	}, [
		optionIndex,
		storeName,
		id,
	]);
	// TODO: вынести функцию в отдельный файл
	const onDrop = React.useCallback((e) => {
		const values = [ ...(((Store()
			.getState()['api']
			.list[storeName]
			.data || [])[optionIndex] || {})
			.values || []) ];
		const valueIndex = values.findIndex((item) => item.id === id);

		values.splice(valueIndex, 1);

		actionApiListProp(storeName, 'data', [ ...values ], [
			optionIndex,
			'values', 
		])();
	}, [
		optionIndex,
		storeName,
		id,
	]);

	return <Box pb={2}>
		<Grid
			container
			spacing={3}
			alignItems="center">
			<Grid
				item
				xs={true}>
				<InputMixed
					dataTypeId={props['dataTypeId']}
					required={props['isRequired']}
					name={`option-value-${id}`}
					defaultValue={content}
					onChange={onChange} />
			</Grid>
			{allowDrop
				? <Grid
					item
					xs={false}>
					<IconButton onClick={onDrop}>
						<CloseIcon color="error" />
					</IconButton>
				</Grid>
				: <React.Fragment />}
		</Grid>
	</Box>;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
};

let Field = ({
	storeName,
	id,
	index,
	values,
	allowDrop,
	...props
}) => {
	const valuesData = React.useMemo(() => values(), [
		values,
	]);

	// TODO: вынести функцию в отдельный файл
	const onAdd = React.useCallback((e) => {
		const values = [ ...(((Store()
			.getState()['api']
			.list[storeName]
			.data || [])[index] || {})
			.values || []) ];

		values.push({
			...values[0],
			content: '',
			id: Date.now(),
		});

		actionApiListProp(storeName, 'data', values, [
			index,
			'values', 
		])();
	}, [
		index,
		storeName,
	]);

	return <React.Fragment>
		{(valuesData || []).length > 0
			? <React.Fragment>
				{props['name']
					? <Box 
						pt={2}
						pb={props['description']
							? 1
							: 2}>
						<Typography
							component="div"
							variant="subtitle1">
							{props['name']}
						</Typography>
					</Box>
					: <React.Fragment />}
					{valuesData.map((item, valueIndex) => {
						return <Item
							key={item['id'] ?? valueIndex}
							storeName={storeName}
							id={item['id']}
							optionIndex={index}
							valueIndex={valueIndex}
							content={item['content']}
							allowDrop={(props['isMultiline'] && valuesData['length'] > 1)}
							{ ...props } />;
					})}
					{props['description']
						? <Box pb={2}>
							<Typography	
								component="div"
								variant="caption">
								{props['description']}
							</Typography>
						</Box>
						: <React.Fragment />}
					{props['isMultiline']
						? <Box pb={6}>
							<Button
								disableElevation
								variant="contained"
								color="primary"
								onClick={onAdd}>
								Add
							</Button>
						</Box>
						: <React.Fragment />}
				</React.Fragment>
				: <React.Fragment />}
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
	values: () => undefined,
};
Field.propTypes = {
	values: PropTypes.func,
	storeName: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

export default Field;
