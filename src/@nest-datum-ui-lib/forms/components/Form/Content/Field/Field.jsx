import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Loader from '@nest-datum-ui/components/Loader';
import MixedValue from '@nest-datum-ui/components/Form/MixedValue';
import SelectFieldContent from '@nest-datum-ui-lib/forms/components/Select/Field/Content';
import onCreate from './onCreate.js';

let Field = ({ 
	formId,
	entityId,
	storeName,
	withAccessToken,
	url,
	path,
	pathCreate,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const fieldId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'fieldId' ]));
	const field = useSelector(selectorFindArray([ 'api', 'list', 'formsFieldContentList', 'data' ], (item) => item['id'] === fieldId));
	const dataTypeId = (field || {})['dataTypeId'];
	const errorFieldId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'errors', 'fieldId' ]));
	const errorValue = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'errors', 'value' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			enqueueSnackbar,
			storeName,
			entityId,
			withAccessToken,
			url,
			path,
			pathCreate,
		});
	}, [
		enqueueSnackbar,
		storeName,
		entityId,
		withAccessToken,
		url,
		path,
		pathCreate,
	]);
	const onChangeFieldId = React.useCallback((e) => {
		actionApiFormProp(storeName, 'fieldId', e.target.value)();
	}, [
		storeName,
	]);
	
	React.useEffect(() => {
		actionApiFormGet({ entityId: storeName })();
	}, [
		storeName,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(storeName)();
	}, [
		storeName,
	]);

	return <React.Fragment>
		<Loader	visible={typeof loader === 'undefined'} />
		<Box py={2}>
			<SelectFieldContent
				required
				formId={formId}
				disabled={loader}
				name="fieldId"
				label="Select field"
				value={fieldId || ''}
				onChange={onChangeFieldId}
				error={errorFieldId} />
		</Box>
		{(fieldId
			&& dataTypeId)
			? <Box py={2}>
				<MixedValue 
					entityId={storeName}
					dataTypeId={dataTypeId}
					name="value"
					label="Value"
					error={errorValue} />
			</Box>
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
					onClick={onSubmit}
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
		</Grid>
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
};

export default Field;
