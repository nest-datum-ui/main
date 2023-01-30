import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { format } from 'date-fns';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
// import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import FilesPaperPreviewFolder from '@nest-datum-ui-lib/files/components/Paper/Preview/Folder';
import FilesPaperPreviewFile from '@nest-datum-ui-lib/files/components/Paper/Preview/File';

let Manage = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const location = useLocation();
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ])) || [];
	const currentFolderId = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data', breadcrumbs.length - 1, 'key' ]));
	const fileLoader = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFileList', 'loader' ]));
	const fileData = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFileList', 'data' ]));
	const fileDataLength = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFileList', 'data', 'length' ]));
	const folderData = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFolderList', 'data' ]));
	const folderLoader = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFolderList', 'loader' ]));
	const folderDataLength = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFolderList', 'data', 'length' ]));
	const folderRootData = useSelector(selectorMainExtract([ 'api', 'list', 'filesManageFolderRoot', 'data' ]));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'systemId' ]));
	const system = useSelector(selectorFindArray([ 'api', 'list', 'filesSystemSelect', 'data' ], (item) => item['id'] === systemId));
	const query = utilsUrlSearchPathItem('query', location.search);
	const select = utilsUrlSearchPathItem('select', location.search);
	const filter = utilsUrlSearchPathItem('filter', location.search);
	const sort = utilsUrlSearchPathItem('sort', location.search);
	const parentId = ((folderRootData || [])[0] || {})['id'];
	const systemSystemOption = system['systemSystemOptions'].find((item) => item['systemOptionId'] === 'files-system-option-root');
	const systemSystemOptionContent = systemSystemOption
		? system['systemSystemSystemOptions'].find((item) => item['systemSystemOptionId'] === systemSystemOption['id'])
		: undefined;
	const rootPath = (systemSystemOptionContent || {})['content'];

	React.useEffect(() => {
		if (rootPath) {
			actionApiListGet({
				id: 'filesManageFolderRoot', 
				url: process.env.SERVICE_FILES,
				path: 'folder',
				withAccessToken: true,
				limit: 1,
				filter: {
					systemId,
					path: rootPath,
				},
			})(enqueueSnackbar);
		}
	}, [
		rootPath,
		systemId,
		enqueueSnackbar,
	]);

	React.useEffect(() => {
		if (rootPath
			&& parentId) {
			actionBreadcrumbsListSet('filesManageList', [{
				key: parentId,
				text: '...',
				path: rootPath,
			}])();
		}
	}, [
		rootPath,
		parentId,
	]);

	React.useEffect(() => {
		if (currentFolderId) {
			actionApiListGet({
				id: 'filesManageFileList', 
				url: process.env.SERVICE_FILES,
				path: 'file',
				withAccessToken: true,
				limit: 9999,
				query,
				filter: {
					parentId: currentFolderId,
					systemId,
					...filter
						? { ...JSON.parse(decodeURI(filter)) }
						: {},
				},
				...select
					? { select: JSON.parse(decodeURI(select)) }
					: {},
				...sort
					? { sort: JSON.parse(decodeURI(sort)) }
					: {},
			})(enqueueSnackbar);
			actionApiListGet({
				id: 'filesManageFolderList', 
				url: process.env.SERVICE_FILES,
				path: 'folder',
				withAccessToken: true,
				limit: 9999,
				query,
				filter: {
					parentId: currentFolderId,
					systemId,
					...filter
						? { ...JSON.parse(decodeURI(filter)) }
						: {},
				},
				...select
					? { select: JSON.parse(decodeURI(select)) }
					: {},
				...sort
					? { sort: JSON.parse(decodeURI(sort)) }
					: {},
			})(enqueueSnackbar);
		}
	}, [
		systemId,
		query,
		select,
		filter,
		sort,
		currentFolderId,
		enqueueSnackbar,
	]);

	React.useEffect(() => () => {
		actionApiListClear('filesManageFileList')();
	}, [
	]);

	return <React.Fragment>
		<Loader visible={(fileLoader 
			|| folderLoader
			|| !(fileDataLength >= 0)
			|| !(folderDataLength >= 0))} />
		{(!fileLoader 
			&& !folderLoader
			&& fileDataLength >= 0
			&& folderDataLength >= 0)
			? ((fileDataLength > 0
				|| folderDataLength > 0)
				? <React.Fragment>
					<Grid
						container
						alignItems="flex-start"
						spacing={4}>
						{(folderData || []).map((folder, i) => {
							return <React.Fragment key={folder.id}>
								<FilesPaperPreviewFolder { ...folder } { ...props } />
							</React.Fragment>;
						})}
						{(fileData || []).map((file, i) => {
							return <React.Fragment key={file.id}>
								<FilesPaperPreviewFile { ...file } { ...props } />
							</React.Fragment>;
						})}
					</Grid>
				</React.Fragment>
				: <Box
					py={6}
					display="flex"
					justifyContent="center">
					<Typography
						variant="subtitle2"
						color="secondary">
						Directory is empty
					</Typography>
				</Box>)
			: <React.Fragment />}
	</React.Fragment>;
};

Manage = React.memo(Manage);
Manage.defaultProps = {
	menu: false,
	selectSeveral: false,
};
Manage.propTypes = {
	menu: PropTypes.bool,
	selectSeveral: PropTypes.bool,
	onSelectFolder: PropTypes.func,
	onSelectFile: PropTypes.func,
};

export default Manage;
