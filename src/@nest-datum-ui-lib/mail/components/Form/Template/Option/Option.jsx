import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Loader from '@nest-datum-ui/components/Loader';
import Store from '@nest-datum-ui/components/Store';
import SelectTemplate from '@nest-datum-ui-lib/mail/components/Select/Template';
import onCreate from './onCreate.js';

let Option = ({ 
	entityId,
	storeName,
	withAccessToken,
	url,
	path,
	pathCreate,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const existsDataLength = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const templateId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'templateId' ]));
	const errorTemplateId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'errors', 'templateId' ]));
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
	const onChangeTemplateId = React.useCallback((e) => {
		actionApiFormProp(storeName, 'templateId', e.target.value)();
	}, [
		storeName,
	]);
	const filterData = React.useCallback((e) => ({
		id: [
			'$Not',
			'$In',
			...(Store()
				.getState()['api']
				.list[storeName]
				.data || [])
				.map((item) => item['roleId']),
		],
	}), [
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
			<SelectTemplate
				disabled={loader}
				name="templateId"
				label="Select form"
				value={templateId || ''}
				onChange={onChangeTemplateId}
				error={errorTemplateId}
				{ ...(existsDataLength > 0)
					? { filter: filterData }
					: {} } />
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

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
