import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from 'components/Dialog';
import Loader from 'components/Loader';
import InputText from 'components/Input/Text';
import utilsValidateFileName from 'utils/validate/fileName.js';
import onUpdate from './onUpdate.js';

let Update = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const entityId = useSelector(selectorMainExtract([ 'dialog', 'storage-file-update', 'entityId' ]));
	const name = useSelector(selectorMainExtract([ 'dialog', 'storage-file-update', 'name' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'storage', 'data' ])) ?? [];
	const currentFolderId = (breadcrumbs[breadcrumbs.length - 1] || {}).key || '';
	const [ state, setState ] = React.useState(() => ({
		loader: false,
		value: '',
		error: '',
	}));
	const onSave = React.useCallback(async (e) => {
		setState((state) => {
			if (!state.error) {
				onUpdate({
					value: state.value,
					gateway,
					id: entityId,
					folderId: currentFolderId,
					enqueueSnackbar,
					setState,
				});
			}
			return state;
		});
	}, [
		gateway,
		entityId,
		currentFolderId,
		setState,
		enqueueSnackbar,
	]);
	const onChange = React.useCallback((e) => {
		setState((state) => {
			if (!state.error) {
				return {
					...state,
					value: e.target.value,
				}
			}
			return state;
		});
	}, [
		setState,
	]);
	const onValidate = React.useCallback((e) => {
		setState((state) => ({
			...state,
			error: !utilsValidateFileName(e)
				? 'Недопустимые символы: / и . в начале.'
				: '',
		}));
	}, [
		setState,
	]);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			maxWidth="xs"
			id="storage-file-update"
			title="Изменить название файла"
			actions={<React.Fragment>
				<Button
					disableElevation
					disabled={!!state.error || state.loader}
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onSave}>
					Сохранить
				</Button>
			</React.Fragment>}>
			{(state.loader || !name)
				? <Loader visible />
				: <InputText
					required
					name="name"
					label="Название файл"
					helperText="Недопустимые символы: / и . в начале."
					onInput={onValidate}
					onChange={onChange}
					defaultValue={name}
					error={state.error} />}
		</Dialog>
	</React.Fragment>;
};

Update = React.memo(Update);
Update.defaultProps = {
};
Update.propTypes = {
};

export default Update;