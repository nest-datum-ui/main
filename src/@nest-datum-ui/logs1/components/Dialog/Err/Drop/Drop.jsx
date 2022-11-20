import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireFormDrop as actionApiFromDrop } from 'components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from 'components/Store/dialog/actions/close.js';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from 'components/Dialog';

let Drop = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const entityId = useSelector(selectorMainExtract([ 'dialog', 'err', 'entityId' ]));
	const onDrop = React.useCallback(async (e) => {
		await actionApiFromDrop({
			entityId,
			storeName: 'errList',
			withAccessToken: true,
			url: gateway,
			path: 'error',
		})(enqueueSnackbar);
		await actionDialogClose('err')();
	}, [
		gateway,
		entityId,
		enqueueSnackbar,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			maxWidth="xs"
			id="err"
			title="Удалить запись?"
			actions={<React.Fragment>
				<Button
					disableElevation
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onDrop}>
					Да
				</Button>
			</React.Fragment>}>
			<DialogContentText>
				Вы уверены, что хотите удалить текущую запись? Эта операция безвозвратна и может нарушить целосность данных.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;