import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableFormOptions from '@nest-datum-ui-lib/forms/components/Table/Form/Options';
import DialogFormReferenceItem from '@nest-datum-ui-lib/forms/components/Dialog/Form/Reference/Item';
import DialogFormReferenceDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		formFormOptions: {
			formOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('formsFormReferenceItem', { entityId })();
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
						Forms
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of forms that will own the current option.
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
						Add new form
					</Button>
				</Box>
				<TableFormOptions 
					storeName="formsFormOptionsList"
					filterOptions={filterOptions} />
				<DialogFormReferenceItem storeName="formsFormOptionsList" />
				<DialogFormReferenceDrop storeName="formsFormOptionsList" />
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
