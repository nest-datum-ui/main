import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useParams,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectSystemStatus from '@nest-datum-ui-lib/files/components/Select/System/Status';
import SelectProvider from '@nest-datum-ui-lib/files/components/Select/Provider';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import FormOptionEntityReference from '@nest-datum-ui/components/Form/Option/Entity/Reference';
import onCreate from './onCreate.js';

let System = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'name' ]));
	const description = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'description' ]));
	const providerId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'providerId' ]));
	const systemStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'systemStatusId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'name' ]));
	const errorDescription = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'description' ]));
	const errorProviderId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'providerId' ]));
	const errorSystemStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'systemStatusId' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_FILES,
			entityId,
			path: 'system',
			withAccessToken: true,
			enqueueSnackbar,
			navigate,
		});
	}, [
		entityId,
		enqueueSnackbar,
		navigate,
	]);
	const onChangeId = React.useCallback((e) => {
		actionApiFormProp(entityId, 'id', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeName = React.useCallback((e) => {
		actionApiFormProp(entityId, 'name', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeDescription = React.useCallback((e) => {
		actionApiFormProp(entityId, 'description', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeProviderId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'providerId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeSystemStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'systemStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeIsNotDelete = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isNotDelete', newValue)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('optionDrop', { entityId })();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_FILES,
				path: 'system',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		unmount,
		entityId,
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(entityId)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Loader	visible={typeof loader === 'undefined' || unmount} />
		<form 
			onSubmit={onSubmit}
			style={{
				display: (typeof loader === 'undefined' || unmount)
					? 'none'
					: 'initial',
			}}>
			<Box py={2}>
				<InputText
					disabled={loader}
					name="id"
					label="id"
					helperText="Unique identificator"
					placeholder="For example: test-entity-id"
					value={id || ''}
					onChange={onChangeId}
					error={errorId} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					required
					name="name"
					label="Name"
					placeholder="For example: Test option"
					value={name || ''}
					onChange={onChangeName}
					error={errorName} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					multiline
					rows={3}
					name="description"
					label="Description"
					value={description || ''}
					onChange={onChangeDescription}
					error={errorDescription} />
			</Box>
			<Box py={2}>
				<SelectProvider
					disabled={loader}
					label="System provider"
					name="providerId"
					value={providerId || ''}
					onChange={onChangeProviderId}
					error={errorProviderId} />
			</Box>
			<Box py={2}>
				<SelectSystemStatus
					disabled={loader}
					label="Status"
					name="systemStatusId"
					value={systemStatusId || ''}
					onChange={onChangeSystemStatusId}
					error={errorSystemStatusId} />
			</Box>
			<Box py={2}>
				<InputBool
					disabled={loader}
					name="isNotDelete"
					label="Make entry undeletable"
					value={!!isNotDelete}
					onChange={onChangeIsNotDelete}
					error={errorIsNotDelete} />
			</Box>
			<FormOptionEntityReference
				withAccessToken
				entityId={entityId}
				url={process.env.SERVICE_FILES}
				path="system-option"
				pathEntity="system" />
			<Grid
				container
				spacing={3}
				alignItems="center"
				justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<Button
						disableElevation
						disabled={loader}
						type="submit"
						variant="contained"
						color="secondary"
						startIcon={loader
							? <Loader
								visible
								wrapper={{
									sx: {
										padding: '0px',
									},
								}}
								sx={{
									minWidth: '24px',
									maxWidth: '24px',
									minHeight: '24px',
									maxHeight: '24px',
								}} />
							: <SaveIcon />}>
						Save
					</Button>
				</Grid>
				{(!isNotDelete
					&& entityId
					&& typeof entityId === 'string'
					&& entityId !== '0')
					? <Grid
						item
						xs={false}>
						<Button
							disableElevation
							disabled={loader}
							variant="contained"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={onDelete}>
							{isDeleted
								? 'Delete permanently'
								: 'Delete'}
						</Button>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</form>
	</React.Fragment>;
};

System = React.memo(System);
System.defaultProps = {
};
System.propTypes = {
};

export default System;
