import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';

let Drop = ({
	storeName,
	id,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const onDrop = React.useCallback(async (e) => {
		await actionApiFromDrop({
			entityId,
			storeName,
			withAccessToken: true,
			url: process.env.SERVICE_FORMS,
			path: 'form',
		})(enqueueSnackbar);
		await actionDialogClose(id)();
	}, [
		storeName,
		id,
		entityId,
		enqueueSnackbar,
	]);
	const loader = formLoader === true || listLoader === true;

	return <React.Fragment>
		<Dialog 
			{ ...props }
			loader={loader}
			maxWidth="xs"
			id={id}
			title="Delete form?"
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
				Are you sure you want to delete the current form? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'formsFormDrop',
};
Drop.propTypes = {
};

export default Drop;