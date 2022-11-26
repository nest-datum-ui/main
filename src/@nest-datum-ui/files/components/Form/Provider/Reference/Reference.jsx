import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Loader from '@nest-datum-ui/components/Loader';
import SelectProvider from '@nest-datum-ui/files/components/Select/Provider';
import onCreate from './onCreate.js';

let Reference = ({ storeName }) => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const providerId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'providerId' ]));
	const errorProviderId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'providerId' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			enqueueSnackbar,
			listStoreName: storeName,
			entityId,
		});
	}, [
		enqueueSnackbar,
		storeName,
		entityId,
	]);
	const onChangeProviderId = React.useCallback((e) => {
		actionApiFormProp(entityId, 'providerId', e.target.value)();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		actionApiFormGet({ entityId })();
	}, [
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(entityId)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Loader	visible={typeof loader === 'undefined'} />
		<Box py={2}>
			<SelectProvider
				disabled={loader}
				name="providerId"
				label="Select system provider"
				value={providerId || ''}
				onChange={onChangeProviderId}
				error={errorProviderId} />
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

Reference = React.memo(Reference);
Reference.defaultProps = {
};
Reference.propTypes = {
};

export default Reference;
