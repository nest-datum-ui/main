import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import Store from '@nest-datum-ui/components/Store';
import Link from '@nest-datum-ui/components/Link';

let Manage = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const loader = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'loader' ]));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'systemId' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ])) || [];
	const currentPath = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data', breadcrumbs.length - 1, 'path' ]));
	const onChange = React.useCallback((e) => {
		e.target.files['systemId'] = systemId;
		e.target.files['path'] = currentPath;

		actionApiFormProp('filesManageSystem', 'loader', true)();
		actionApiListProp('filesManageFileList', 'loader', true)();
		actionApiFormProp('filesManageSystem', 'files', e.target.files)(() => {
			actionApiFormCreate({
				entityId: 'filesManageSystem',
				url: process.env.SERVICE_FILES,
				path: 'file',
				withAccessToken: true,
			})(enqueueSnackbar, navigate, async (response, files) => {
				const filesManageFileList = [ ...((Store()
					.getState()
					.api
					.list
					.filesManageFileList || {})
					.data || []) ];

				await actionApiListProp('filesManageFileList', 'data', [ 
					...filesManageFileList,
					...files[0], 
				])();
				await actionApiListProp('filesManageFileList', 'loader', false)();
				await actionApiFormProp('filesManageSystem', 'loader', false)();
			});
		});
	}, [
		systemId,
		currentPath,
		enqueueSnackbar,
		navigate,
	]);
	const onAddFolder = React.useCallback(() => {
		actionDialogOpen('filesManageFolderStore', { 
			entityId: '0', 
		})();
	}, [
	]);

	React.useEffect(() => () => {
		actionApiFormClear('filesManageSystem')();
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
					disabled={loader}
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<AddIcon />}
					onClick={onAddFolder}
					component={Link}
					to="0"
					disableUnmountFlag>
					Create folder
				</Button>
			</Grid>
			<Grid
				item
				xs={false}>
				<Button
					disableElevation
					disabled={loader}
					component="label"
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<UploadIcon />}>
					Upload files
					{/*accept="image/png, image/jpeg, image/jpg, image/gif"*/}
					<input 
						multiple
						name="files"
						type="file"
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
