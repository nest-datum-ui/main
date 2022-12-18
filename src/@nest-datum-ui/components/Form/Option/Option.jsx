import React from 'react';
import PropTypes from 'prop-types';
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
import InputText from '@nest-datum-ui/components/Input/Text';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import SelectDataType from '@nest-datum-ui-lib/data-type/components/Select/Type';
import Loader from '@nest-datum-ui/components/Loader';
import TableManyToMany from '@nest-datum-ui/components/Table/ManyToMany';
import MixedValue from '@nest-datum-ui/components/Form/MixedValue';
import onSave from './onSave.js';

let Option = ({
	type,
	storeName,
	withAccessToken,
	url,
	path,
	pathRelation,
	pathCreate,
	relationTitle,
	relationDescription,
	FormOptionComponent,
	filterOptions,
	manyToManyColumns,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'name' ]));
	const description = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'description' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'dataTypeId' ]));
	const regex = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'regex' ]));
	const isRequired = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isRequired' ]));
	const isMultiline = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isMultiline' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorName = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'name' ]));
	const errorDescription = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'description' ]));
	const errorDataTypeId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'dataTypeId' ]));
	const errorRegex = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'regex' ]));
	const errorIsRequired = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isRequired' ]));
	const errorIsMultiline = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isMultiline' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onSave({
			entityId,
			url,
			path,
			withAccessToken,
			enqueueSnackbar,
			navigate,
		});
	}, [
		url,
		path,
		withAccessToken,
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
	const onChangeDataTypeId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'dataTypeId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeRegex = React.useCallback((e) => {
		actionApiFormProp(entityId, 'regex', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeIsRequired = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isRequired', newValue)();
	}, [
		entityId,
	]);
	const onChangeIsMultiline = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isMultiline', newValue)();
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
			&& entityId !== '0'
			&& url) {
			actionApiFormGet({
				entityId,
				url,
				path,
				withAccessToken,
			})(enqueueSnackbar, navigate);
		}
	}, [
		unmount,
		url,
		path,
		withAccessToken,
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
				<SelectDataType
					required
					disabled={loader}
					name="dataTypeId"
					label="Data type"
					value={dataTypeId || ''}
					onChange={onChangeDataTypeId}
					error={errorDataTypeId} />
			</Box>
			{dataTypeId
				? <Box py={2}>
					<MixedValue 
						entityId={entityId}
						name="defaultValue"
						label="Default value" />
				</Box>
				: <React.Fragment />}
			<Box py={2}>
				<InputText
					disabled={loader}
					name="regex"
					label="Regular expression"
					placeholder="For example: ^[0-9]+$"
					value={regex || ''}
					onChange={onChangeRegex}
					error={errorRegex} />
			</Box>
			{(type === 'manyToMany'
				&& entityId
				&& typeof entityId === 'string'
				&& entityId !== '0')
				? <TableManyToMany
					withAccessToken
					url={url}
					path={pathRelation}
					storeName={`${storeName}Option`}
					filterOptions={filterOptions}
					columns={manyToManyColumns}
					title={relationTitle}
					description={relationDescription}>
					<FormOptionComponent
						withAccessToken
						entityId={entityId}
						url={url}
						path={pathRelation}
						pathCreate={pathCreate}
						storeName={`${storeName}Option`} />
				</TableManyToMany>
				: <React.Fragment />}
			<Box py={2}>
				<InputBool
					disabled={loader}
					name="isRequired"
					label="Required to fill"
					value={!!isRequired}
					onChange={onChangeIsRequired}
					error={errorIsRequired} />
			</Box>
			<Box py={2}>
				<InputBool
					disabled={loader}
					name="isMultiline"
					label="Multidimensional value"
					value={!!isMultiline}
					onChange={onChangeIsMultiline}
					error={errorIsMultiline} />
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

Option = React.memo(Option);
Option.defaultProps = {
	type: 'manyToMany',
};
Option.propTypes = {
	filterOptions: PropTypes.func,
	manyToManyColumns: PropTypes.func,
};

export default Option;
