import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Store from '@nest-datum-ui/components/Store';
import Dialog from '@nest-datum-ui/components/Dialog';

let Drop = ({
	id,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const [ loader, setState ] = React.useState(() => false);
	const onClose = React.useCallback(async (e) => {
		actionDialogClose(id)();
		navigate(`/files/manage`);
	}, [
		id,
		navigate,
	]);
	const onDrop = React.useCallback(async (e) => {
		setState(true);

		const filesManageFolderList = [ ...((Store()
			.getState()
			.api
			.list
			.filesManageFolderList || {})
			.data || []) ];
		const findIndex = filesManageFolderList.findIndex((folder) => folder.id === entityId);

		await actionApiFormProp(entityId, 'loader', true)();
		await actionApiFromDrop({
			entityId,
			storeName: entityId,
			withAccessToken: true,
			url: process.env.SERVICE_FILES,
			path: 'folder',
			notRedirect: true,
		})(enqueueSnackbar);

		if (filesManageFolderList[findIndex]) {
			if (filesManageFolderList[findIndex]['isDeleted']) {
				filesManageFolderList.splice(findIndex, 1);
			}
			else {
				filesManageFolderList[findIndex]['isDeleted'] = true;
			}
			await actionApiListProp('filesManageFolderList', 'data', [ ...filesManageFolderList ])();
		}
		await actionApiFormProp(entityId, 'loader', false)();

		onClose();
	}, [
		entityId,
		enqueueSnackbar,
		onClose,
		setState,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			onClose={onClose}
			loader={loader}
			maxWidth="xs"
			id={id}
			title="Delete folder?"
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
				Are you sure you want to delete the current folder? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'filesManageFolderDrop',
};
Drop.propTypes = {
};

export default Drop;