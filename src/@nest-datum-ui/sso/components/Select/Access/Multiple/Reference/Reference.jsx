import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableAccessOptions from '@nest-datum-ui/sso/components/Table/Access/Options';
import DialogAccessReferenceItem from '@nest-datum-ui/sso/components/Dialog/Access/Reference/Item';
import DialogAccessReferenceDrop from '@nest-datum-ui/sso/components/Dialog/Access/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		accessAccessOptions: {
			accessOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('ssoAccessReferenceItem', { entityId })();
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
						Accesses
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of accesses that will own the current option.
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
						Add new access
					</Button>
				</Box>
				<TableAccessOptions 
					storeName="ssoAccessOptionsList"
					filterOptions={filterOptions} />
				<DialogAccessReferenceItem storeName="ssoAccessOptionsList" />
				<DialogAccessReferenceDrop storeName="ssoAccessOptionsList" />
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
