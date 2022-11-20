import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from 'components/Dialog';
import Loader from 'components/Loader';
import onDelete from './onDelete.js';

let Drop = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const entityId = useSelector(selectorMainExtract([ 'dialog', 'storage-folder-drop', 'entityId' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'storage', 'data' ])) ?? [];
	const currentFolderId = (breadcrumbs[breadcrumbs.length - 1] || {}).key || '';
	const [ state, setState ] = React.useState(() => ({
		loader: false,
	}));
	const onDrop = React.useCallback(async (e) => {
		onDelete({
			gateway,
			id: entityId,
			folderId: currentFolderId,
			enqueueSnackbar,
			setState,
		});
	}, [
		gateway,
		entityId,
		currentFolderId,
		enqueueSnackbar,
		setState,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			maxWidth="xs"
			id="storage-folder-drop"
			title="Удалить папку?"
			actions={<React.Fragment>
				<Button
					disableElevation
					disabled={state.loader}
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onDrop}>
					Да
				</Button>
			</React.Fragment>}>
			{state.loader
				? <Loader visible />
				: <DialogContentText>
					Вы уверены, что хотите удалить текущую папку? Эта операция безвозвратна и может нарушить целосность данных.
				</DialogContentText>}
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;