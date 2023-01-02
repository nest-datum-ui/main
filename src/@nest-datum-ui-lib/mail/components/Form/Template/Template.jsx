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
import SelectTemplateStatus from '@nest-datum-ui-lib/mail/components/Select/Template/Status';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import FormOptionManyToMany from '@nest-datum-ui/components/Form/Option/ManyToMany';
import onCreate from './onCreate.js';

let Template = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'name' ]));
	const description = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'description' ]));
	const fromEmail = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'fromEmail' ]));
	const fromName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'fromName' ]));
	const templateStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'templateStatusId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'name' ]));
	const errorDescription = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'description' ]));
	const errorFromEmail = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'fromEmail' ]));
	const errorFromName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'fromName' ]));
	const errorTemplateStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'templateStatusId' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_MAIL,
			entityId,
			path: 'template',
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
	const onChangeFromEmail = React.useCallback((e) => {
		actionApiFormProp(entityId, 'fromEmail', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeFromName = React.useCallback((e) => {
		actionApiFormProp(entityId, 'fromName', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeTemplateStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'templateStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeIsNotDelete = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isNotDelete', newValue)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('mailTemplateDrop', { entityId })();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_MAIL,
				path: 'template',
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
				<InputEmail
					required
					disabled={loader}
					name="fromEmail"
					label="From email"
					value={fromEmail || ''}
					onChange={onChangeFromEmail}
					error={errorFromEmail} />
			</Box>
			<Box py={2}>
				<InputText
					required
					disabled={loader}
					name="fromName"
					label="From name"
					value={fromName || ''}
					onChange={onChangeFromName}
					error={errorFromName} />
			</Box>
			<Box py={2}>
				<SelectTemplateStatus
					disabled={loader}
					label="Status"
					name="templateStatusId"
					value={templateStatusId || ''}
					onChange={onChangeTemplateStatusId}
					error={errorTemplateStatusId} />
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
			<FormOptionManyToMany
				withAccessToken
				entityId={entityId}
				url={process.env.SERVICE_MAIL}
				path="template-option"
				pathEntity="template" />
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

Template = React.memo(Template);
Template.defaultProps = {
};
Template.propTypes = {
};

export default Template;
