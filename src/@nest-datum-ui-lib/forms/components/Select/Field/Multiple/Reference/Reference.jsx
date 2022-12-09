import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableFieldOptions from '@nest-datum-ui-lib/forms/components/Table/Field/Options';
import DialogFieldReferenceItem from '@nest-datum-ui-lib/forms/components/Dialog/Field/Reference/Item';
import DialogFieldReferenceDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		fieldFieldOptions: {
			fieldOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('formsFieldReferenceItem', { entityId })();
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
						Fields
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of fields that will own the current option.
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
						Add new field
					</Button>
				</Box>
				<TableFieldOptions 
					storeName="formsFieldOptionsList"
					filterOptions={filterOptions} />
				<DialogFieldReferenceItem storeName="formsFieldOptionsList" />
				<DialogFieldReferenceDrop storeName="formsFieldOptionsList" />
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
