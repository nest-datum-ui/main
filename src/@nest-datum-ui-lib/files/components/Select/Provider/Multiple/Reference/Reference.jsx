import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableProviderOptions from '@nest-datum-ui-lib/files/components/Table/Provider/Options';
import DialogProviderReferenceItem from '@nest-datum-ui-lib/files/components/Dialog/Provider/Reference/Item';
import DialogProviderReferenceDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		providerProviderOptions: {
			providerOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('filesProviderReferenceItem', { entityId })();
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
						System providers
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of system providers that will own the current option.
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
						Add new system provider
					</Button>
				</Box>
				<TableProviderOptions 
					storeName="filesProviderOptionsList"
					filterOptions={filterOptions} />
				<DialogProviderReferenceItem storeName="filesProviderOptionsList" />
				<DialogProviderReferenceDrop storeName="filesProviderOptionsList" />
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
