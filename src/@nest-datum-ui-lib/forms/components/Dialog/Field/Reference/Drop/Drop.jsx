import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';
import onDelete from './onDelete.js';

let Drop = ({
	storeName,
	id,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	// const listStoreName = useSelector(selectorMainExtract([ 'dialog', id, 'listStoreName' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const fieldId = useSelector(selectorMainExtract([ 'dialog', id, 'fieldId' ]));
	const optionId = useSelector(selectorMainExtract([ 'dialog', id, 'optionId' ]));
	const onDrop = React.useCallback(async (e) => {
		onDelete({
			enqueueSnackbar,
			listStoreName: storeName,
			id,
			optionId,
			fieldId,
		});
	}, [
		storeName,
		id,
		fieldId,
		optionId,
		enqueueSnackbar,
	]);
	const loader = formLoader === true || listLoader === true;

	return <React.Fragment>
		<Dialog 
			{ ...props }
			loader={loader}
			maxWidth="xs"
			id={id}
			title="Delete link?"
			actions={<React.Fragment>
				<Button
					disabled={loader}
					disableElevation
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onDrop}>
					OK
				</Button>
			</React.Fragment>}>
			<DialogContentText>
				Are you sure you want to delete the current link? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'formsFieldReferenceDrop',
};
Drop.propTypes = {
};

export default Drop;