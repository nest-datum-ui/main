import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableTypeOptions from '@nest-datum-ui/data-type/components/Table/Type/Options';
import DialogTypeReferenceItem from '@nest-datum-ui/data-type/components/Dialog/Type/Reference/Item';
import DialogTypeReferenceDrop from '@nest-datum-ui/data-type/components/Dialog/Type/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		typeTypeOptions: {
			typeOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('dataTypeTypeReferenceItem', { entityId })();
	}, [
		entityId,
	]);

	return <React.Fragment>
		{(entityId
			&& entityId !== '0')
			? <React.Fragment>
				<Box>
					<Typography
						component="div"
						variant="h6">
						Types
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of types that will own the current option.
					</Typography>
				</Box>
				<Box py={2}>
					<Button
						disableElevation
						variant="contained"
						color="secondary"
						size="small"
						startIcon={<AddIcon />}
						onClick={onAdd}>
						Add new type
					</Button>
				</Box>
				<TableTypeOptions 
					storeName="dataTypeTypeOptionsList"
					filterOptions={filterOptions} />
				<DialogTypeReferenceItem storeName="dataTypeTypeOptionsList" />
				<DialogTypeReferenceDrop storeName="dataTypeTypeOptionsList" />
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

SelectMultipleReference = React.memo(SelectMultipleReference);
SelectMultipleReference.defaultProps = {
};
SelectMultipleReference.propTypes = {
};

export default SelectMultipleReference;
