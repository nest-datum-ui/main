import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	actionApiListBulk,
	actionApiListBulkDrop,
} from '@nest-datum-ui/Store';
import { 
	func as utilsCheckFunc,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@nest-datum-ui/Button';
import TableRelation from 'components/Table/Relation';
import CheckboxBulk from 'components/Checkbox/Bulk';
import StyledWrapper from './Styled/Wrapper.jsx';

let Relation = ({ Component, initialFilter, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				title,
				subtitle,
				storeName, 
				bulkDeletion,
				manage,  
			}, 
		},
	} = React.useContext(ContextProps);
	const selected = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selected' ])) || [];
	const selectedForDrop = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDrop' ])) || [];
	const selectedForDropPermanently = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDropPermanently' ])) || [];
	const length = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const onBulk = React.useCallback((e) => actionApiListBulk(storeName, e), [
		storeName,
	]);
	const onDrop = React.useCallback(() => actionApiListBulkDrop(storeName), [
		storeName,
	]);
	const onClick = React.useCallback((onClick, { index, selected, selectedForDrop, selectedForDropPermanently }) => (e) => {
		onClick(e, index, selected, selectedForDrop, selectedForDropPermanently);
	}, [
	]);

	return <StyledWrapper { ...props } initialFilter={initialFilter}>
		<Typography component="div" variant="h6">
			{title} <Typography component="span" variant="caption">(many-to-many)</Typography>
		</Typography>
		<Typography component="div" variant="caption" color="textSecondary">
			{subtitle}
		</Typography>
		<Grid container spacing={1}>
		{(bulkDeletion && length > 0)
			&& <Grid
				item
				xs={false}>
				<CheckboxBulk
					storeName={storeName}
					length={length}
					onClick={onBulk}
					onDrop={onDrop} />
			</Grid>}
		{Object
			.keys(manage)
			.map((key, index) => ((utilsCheckFunc(manage[key].showStrategy) && manage[key].showStrategy(selected, selectedForDrop, selectedForDropPermanently)) || !utilsCheckObj(manage[key]) || !manage[key].showStrategy)
				&& <Grid
					key={index} 
					item
					xs={false}>
					<Button 
						variant={manage[key].variant || 'contained'} 
						color={manage[key].color || 'inherit'}
						{ ...manage[key].onClick ? { onClick: onClick(manage[key].onClick, { index, selected, selectedForDrop, selectedForDropPermanently }) } : {} }>
						{utilsCheckFunc(manage[key].text)
							? manage[key].text(index, selected, selectedForDrop, selectedForDropPermanently)
							: manage[key].text}
					</Button>
				</Grid>)}
		</Grid>
		<TableRelation Component={Component} />
	</StyledWrapper>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
};

export default Relation;
