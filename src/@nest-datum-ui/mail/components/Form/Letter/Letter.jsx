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
import SelectLetterStatus from '@nest-datum-ui/mail/components/Select/Letter/Status';
import SelectTemplate from '@nest-datum-ui/mail/components/Select/Template';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import FormOptionEntityReference from '@nest-datum-ui/components/Form/Option/Entity/Reference';
import onCreate from './onCreate.js';

let Letter = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'name' ]));
	const description = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'description' ]));
	const subject = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'subject' ]));
	const textPart = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'textPart' ]));
	const letterStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'letterStatusId' ]));
	const templateId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'templateId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'name' ]));
	const errorDescription = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'description' ]));
	const errorSubject = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'subject' ]));
	const errorTextPart = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'textPart' ]));
	const errorLetterStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'letterStatusId' ]));
	const errorTemplateId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'templateId' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_MAIL,
			entityId,
			path: 'letter',
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
	const onChangeSubject = React.useCallback((e) => {
		actionApiFormProp(entityId, 'subject', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeTextPart = React.useCallback((e) => {
		actionApiFormProp(entityId, 'textPart', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeLetterStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'letterStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeTemplateId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'templateId', e.target.value)();
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
				url: process.env.SERVICE_MAIL,
				path: 'letter',
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
				<InputText
					disabled={loader}
					name="subject"
					label="Subject"
					value={subject || ''}
					onChange={onChangeSubject}
					error={errorSubject} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					name="textPart"
					label="Letter subtitle"
					value={textPart || ''}
					onChange={onChangeTextPart}
					error={errorTextPart} />
			</Box>
			<Box py={2}>
				<SelectTemplate
					disabled={loader}
					label="Template"
					name="templateId"
					value={templateId || ''}
					onChange={onChangeTemplateId}
					error={errorTemplateId} />
			</Box>
			<Box py={2}>
				<SelectLetterStatus
					disabled={loader}
					label="Status"
					name="letterStatusId"
					value={letterStatusId || ''}
					onChange={onChangeLetterStatusId}
					error={errorLetterStatusId} />
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
				url={process.env.SERVICE_MAIL}
				path="letter-option"
				pathEntity="letter" />
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

Letter = React.memo(Letter);
Letter.defaultProps = {
};
Letter.propTypes = {
};

export default Letter;
