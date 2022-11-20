import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableLetterOptions from '@nest-datum-ui/mail/components/Table/Letter/Options';
import DialogLetterReferenceItem from '@nest-datum-ui/mail/components/Dialog/Letter/Reference/Item';
import DialogLetterReferenceDrop from '@nest-datum-ui/mail/components/Dialog/Letter/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		letterLetterOptions: {
			letterOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('mailLetterReferenceItem', { entityId })();
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
						Letters
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of letters that will own the current option.
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
						Add new letter
					</Button>
				</Box>
				<TableLetterOptions 
					storeName="mailLetterOptionsList"
					filterOptions={filterOptions} />
				<DialogLetterReferenceItem storeName="mailLetterOptionsList" />
				<DialogLetterReferenceDrop storeName="mailLetterOptionsList" />
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
