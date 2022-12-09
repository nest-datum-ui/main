import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
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

		const filesManageFileList = [ ...((Store()
			.getState()
			.api
			.list
			.filesManageFileList || {})
			.data || []) ];
		const findIndex = filesManageFileList.findIndex((file) => file.id === entityId);

		await actionApiFormProp(entityId, 'loader', true)();
		await actionApiFormDrop({
			entityId,
			storeName: entityId,
			withAccessToken: true,
			url: process.env.SERVICE_FILES,
			path: 'file',
			notRedirect: true,
		})(enqueueSnackbar);

		if (filesManageFileList[findIndex]) {
			if (filesManageFileList[findIndex]['isDeleted']) {
				filesManageFileList.splice(findIndex, 1);
			}
			else {
				filesManageFileList[findIndex]['isDeleted'] = true;
			}
			await actionApiListProp('filesManageFileList', 'data', [ ...filesManageFileList ])();
		}
		await actionApiFormProp(entityId, 'loader', false)();

		onClose();
	}, [
		onClose,
		entityId,
		enqueueSnackbar,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			onClose={onClose}
			loader={loader}
			maxWidth="xs"
			id={id}
			title="Delete file?"
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
				Are you sure you want to delete the current file? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'filesManageFileDrop',
};
Drop.propTypes = {
};

export default Drop;