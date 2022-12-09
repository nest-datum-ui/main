import React from 'react';
import { useParams } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableSystemOptions from '@nest-datum-ui-lib/files/components/Table/System/Options';
import DialogSystemReferenceItem from '@nest-datum-ui-lib/files/components/Dialog/System/Reference/Item';
import DialogSystemReferenceDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Reference/Drop';

let SelectMultipleReference = ({
	disabled,
	...props
}) => {
	const { entityId } = useParams();
	const filterOptions = React.useCallback(() => ({
		systemSystemOptions: {
			systemOptionId: entityId,
		}
	}), [
		entityId,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen('filesSystemReferenceItem', { entityId })();
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
						File systems
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="textSecondary">
						List of file systems that will own the current option.
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
						Add new file system
					</Button>
				</Box>
				<TableSystemOptions 
					storeName="filesSystemOptionsList"
					filterOptions={filterOptions} />
				<DialogSystemReferenceItem storeName="filesSystemOptionsList" />
				<DialogSystemReferenceDrop storeName="filesSystemOptionsList" />
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
