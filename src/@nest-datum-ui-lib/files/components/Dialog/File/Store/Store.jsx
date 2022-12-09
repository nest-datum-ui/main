import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';
import FormManageFile from '@nest-datum-ui-lib/files/components/Form/Manage/File';
import onSave from '@nest-datum-ui-lib/files/components/Form/Manage/File/onSave.js';

let Store = ({
	id,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const storeName = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'name' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFileList', 'loader' ]));
	const loader = formLoader === true || listLoader === true;
	const onHandle = React.useCallback(async (e) => {
		e.preventDefault();

		await onSave({
			gateway: process.env.SERVICE_FILES,
			entityId: storeName,
			path: 'file',
			withAccessToken: true,
			enqueueSnackbar,
			navigate,
		});
		await actionDialogClose(id)();
	}, [
		id,
		storeName,
		enqueueSnackbar,
		navigate,
	]);
	const onClose = React.useCallback((e) => {
		actionDialogClose(id)();

		navigate(`/files/manage`);
	}, [
		id,
		navigate,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			onClose={onClose}
			loader={loader}
			maxWidth="xs"
			id={id}
			title={<React.Fragment>
				Update file: <b>{name || storeName}</b>
			</React.Fragment>}
			actions={<React.Fragment>
				<Button
					disabled={loader}
					disableElevation
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onHandle}>
					OK
				</Button>
			</React.Fragment>}>
			<FormManageFile />
		</Dialog>
	</React.Fragment>;
};

Store = React.memo(Store);
Store.defaultProps = {
	id: 'filesManageFileStore',
};
Store.propTypes = {
};

export default Store;