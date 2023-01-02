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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import FilesPaperPrimary from '@nest-datum-ui-lib/files/components/Paper/Primary';
import SelectContentStatus from '@nest-datum-ui-lib/forms/components/Select/Content/Status';
import SelectForm from '@nest-datum-ui-lib/forms/components/Select/Form';
import FormContentField from '@nest-datum-ui-lib/forms/components/Form/Content/Field';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import TableManyToMany from '@nest-datum-ui/components/Table/ManyToMany';
import onCreate from './onCreate.js';

let Content = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const contentStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'contentStatusId' ]));
	const formId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'formId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorContentStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'contentStatusId' ]));
	const errorFormId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'formId' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_FORMS,
			entityId,
			path: 'content',
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
	const onChangeContentStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'contentStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeFormId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'formId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeIsNotDelete = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isNotDelete', newValue)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('formsContentDrop', { entityId })();
	}, [
		entityId,
	]);
	const manyToManyFilterOptions = React.useCallback(() => ({
		contentId: entityId,
	}), [
		entityId,
	]);
	const manyToManyRelationOptions = React.useCallback(() => ({
		field: true,
	}), [
	]);
	const manyToManyColumns = React.useCallback(() => ([
		[ 'fieldId', 'Field', '20%', (column, data) => {
			return <React.Fragment>
				<Box pb={1}>
					<Typography	
						component="div"
						variant="h6">
						{(data['field'] || {})['name'] || ''}
					</Typography>
				</Box>
				<Typography	
					component="div"
					variant="caption">
					{(data['field'] || {})['description'] || ''}
				</Typography>
			</React.Fragment>;
		} ], 
		[ 'value', 'Value', '40%', (column, data) => {
			return <React.Fragment>
				{((data['field'] || {})['dataTypeId'] === 'data-type-type-file-upload')
					? <React.Fragment>
						{(typeof data[column] === 'string'
							&& data[column].length <= 50)
							? <FilesPaperPrimary id={data[column]} />
							: <React.Fragment />}
					</React.Fragment>
					: <Typography component="div">
						{(data[column] || '')
							.split("\n")
							.map((line, ii) => {
								return <Box 
									key={ii}
									pb={1}>
									{line}
								</Box>;
							})}
					</Typography>}
			</React.Fragment>;
		} ], 
		[ 'userId', 'User', '20' ], 
		[ 'createdAt', 'Create at', '20%' ],
	]), [
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_FORMS,
				path: 'content',
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
				<SelectContentStatus
					disabled={loader}
					label="Status"
					name="contentStatusId"
					value={contentStatusId || ''}
					onChange={onChangeContentStatusId}
					error={errorContentStatusId} />
			</Box>
			<Box py={2}>
				<SelectForm
					disabled={loader}
					label="Form"
					name="formId"
					value={formId || ''}
					onChange={onChangeFormId}
					error={errorFormId} />
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
			{(entityId
				&& typeof entityId === 'string'
				&& entityId !== '0'
				&& formId)
				? <TableManyToMany
					withAccessToken
					url={process.env.SERVICE_FORMS}
					path="content/field"
					storeName="formsContentFieldRelation"
					filterOptions={manyToManyFilterOptions}
					relationOptions={manyToManyRelationOptions}
					columns={manyToManyColumns}
					title="Fields"
					description="Fields of current form content.">
					<FormContentField
						withAccessToken
						formId={formId}
						entityId={entityId}
						url={process.env.SERVICE_FORMS}
						path="content/field"
						pathCreate={`content/${entityId}/field`}
						storeName="formsContentFieldRelation" />
				</TableManyToMany>
				: <React.Fragment />}
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

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propTypes = {
};

export default Content;
