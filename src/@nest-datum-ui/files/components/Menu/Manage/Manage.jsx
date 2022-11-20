import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireOpen as actionDialogOpen } from 'components/Store/dialog/actions/open.js';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import onUpload from './onUpload.js';

let Manage = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;	
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'storage', 'data' ])) ?? [];
	const currentFolderId = (breadcrumbs[breadcrumbs.length - 1] || {}).key || '';
	const currentFolderPath = (breadcrumbs[breadcrumbs.length - 1] || {}).path || '';
	const onChange = React.useCallback((e) => {
		onUpload(e, gateway, {
			id: currentFolderId,
			path: currentFolderPath,
		}, enqueueSnackbar);
	}, [
		gateway,
		currentFolderId,
		currentFolderPath,
		enqueueSnackbar,
	]);
	const onAddFolder = React.useCallback(() => {
		actionDialogOpen('storage-folder-create', { 
			type: 'folder', 
		})();
	}, [
	]);

	return <React.Fragment>
		<Grid
			container
			spacing={2}>
			<Grid
				item
				xs={false}>
				<Button
					disableElevation
					component="div"
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<AddIcon />}
					onClick={onAddFolder}>
					Добавить папку
				</Button>
			</Grid>
			<Grid
				item
				xs={false}>
				<Button
					disableElevation
					component="label"
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<UploadIcon />}>
					Загрузить
					<input 
						multiple
						name="files"
						type="file"
						accept="image/png, image/jpeg, image/jpg, image/gif"
						onChange={onChange}
						style={{
							display: 'none',
						}} />
				</Button>
			</Grid>
		</Grid>
	</React.Fragment>;
};

Manage = React.memo(Manage);
Manage.defaultProps = {
};
Manage.propTypes = {
};

export default Manage;
