import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableTemplateOptions from '@nest-datum-ui-lib/mail/components/Table/Template/Options';
import DialogTemplateReferenceItem from '@nest-datum-ui-lib/mail/components/Dialog/Template/Reference/Item';
import DialogTemplateReferenceDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		templateTemplateOptions: {
			templateOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('mailTemplateReferenceItem', { entityId })();
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
						Templates
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of templates that will own the current option.
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
						Add new template
					</Button>
				</Box>
				<TableTemplateOptions 
					storeName="mailTemplateOptionsList"
					filterOptions={filterOptions} />
				<DialogTemplateReferenceItem storeName="mailTemplateOptionsList" />
				<DialogTemplateReferenceDrop storeName="mailTemplateOptionsList" />
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
