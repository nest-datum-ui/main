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
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputUrl from '@nest-datum-ui/components/Input/Url';
import onCreate from './onCreate.js';

let Notification = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const servId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'servId' ]));
	const replica = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'replica' ]));
	const action = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'action' ]));
	const content = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'content' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorServId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'servId' ]));
	const errorReplica = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'replica' ]));
	const errorAction = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'action' ]));
	const errorContent = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'content' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_LOGS,
			entityId,
			path: 'notification',
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
	const onChangeServId = React.useCallback((e) => {
		actionApiFormProp(entityId, 'servId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeReplica = React.useCallback((e) => {
		actionApiFormProp(entityId, 'replica', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeAction = React.useCallback((e) => {
		actionApiFormProp(entityId, 'action', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeContent = React.useCallback((e) => {
		actionApiFormProp(entityId, 'content', e.target.value)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('logsNotificationDrop', { entityId })();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_LOGS,
				path: 'notification',
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
					name="servId"
					label="Service id"
					placeholder="For example: test1"
					value={servId || ''}
					onChange={onChangeServId}
					error={errorServId} />
			</Box>
			<Box py={2}>
				<InputUrl
					disabled={loader}
					required
					name="replica"
					label="Replica"
					placeholder="For example: 127.0.0.1:8000"
					value={replica || ''}
					onChange={onChangeReplica}
					error={errorReplica} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					required
					name="action"
					label="Action"
					placeholder="For example: testFuncForToDoSomething"
					value={action || ''}
					onChange={onChangeAction}
					error={errorAction} />
			</Box>
			<Box py={2}>
				<InputText
					required
					disabled={loader}
					multiline
					rows={4}
					name="content"
					label="Content"
					value={content || ''}
					onChange={onChangeContent}
					error={errorContent} />
			</Box>
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
				{(entityId
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
							Delete
						</Button>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</form>
	</React.Fragment>;
};

Notification = React.memo(Notification);
Notification.defaultProps = {
};
Notification.propTypes = {
};

export default Notification;
