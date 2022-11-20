import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableRoleOptions from '@nest-datum-ui/sso/components/Table/Role/Options';
import DialogRoleReferenceItem from '@nest-datum-ui/sso/components/Dialog/Role/Reference/Item';
import DialogRoleReferenceDrop from '@nest-datum-ui/sso/components/Dialog/Role/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		roleRoleOptions: {
			roleOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('ssoUserReferenceItem', { entityId })();
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
						Roles
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of roles that will own the current option.
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
						Add new role
					</Button>
				</Box>
				<TableRoleOptions 
					storeName="ssoRoleOptionsList"
					filterOptions={filterOptions} />
				<DialogRoleReferenceItem storeName="ssoRoleOptionsList" />
				<DialogRoleReferenceDrop storeName="ssoRoleOptionsList" />
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
