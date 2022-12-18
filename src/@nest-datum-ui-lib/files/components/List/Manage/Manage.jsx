import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { format } from 'date-fns';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { fireListPush as actionBreadcrumbsListPush } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/push.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
// import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Loader from '@nest-datum-ui/components/Loader';
import MenuFolderContext from '@nest-datum-ui-lib/files/components/Menu/Folder/Context';
import MenuFileContext from '@nest-datum-ui-lib/files/components/Menu/File/Context';

let FolderDataMap = ({
	id,
	name,
	path,
	isDeleted,
	isNotDelete,
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const onFolder = React.useCallback((id, name, path) => (e) => {
		actionBreadcrumbsListPush('filesManageList', { 
			key: id,
			text: name, 
			path,
		})();
	}, [
	]);
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`files-menu-folder-context-${itemId}`, e.target)();
	}, [
	]);

	return <React.Fragment>
		<Grid
			item
			xs={2}>
			<Grid
				container
				spacing={1}>
				<Grid
					item
					xs={true}>
					<Button
						component="div"
						onClick={onFolder(id, name, path)}
						sx={{
							alignItems: 'flex-end',
							flexDirection: 'column',
							width: '100%',
							height: '100%',
							backgroundColor: '#f7f7f7',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
								backgroundColor: '#f7f7f7',
								'&:after': {
									content: '""',
									display: 'block',
									paddingBottom: '100%',
								},
							}}>
							{loader
								? <Loader 
									visible
									wrapper={{
										sx: {
											padding: '0px',
										},
									}}
									sx={{
										minWidth: '80px',
										maxWidth: '80px',
										minHeight: '80px',
										maxHeight: '80px',
									}} />
								: <FolderIcon
									sx={{
										fontSize: '80px',
											color: isDeleted
												? 'grey !important'
												: 'inherit',
										}} />}
						</Box>
						<Typography
							component="div"
							variant="body2"
							color={isDeleted
								? 'textSecondary'
								: 'initial'}
							sx={{
								width: '100%',
								padding: '4px 2px',
								textTransform: 'initial',
								wordWrap: 'anywhere',
								textAlign: 'center',
								...isDeleted
									? { textDecoration: 'line-through' }
									: {},
							}}>
							{(name || '').length > 24
								? `${(name || '').substring(0, 24)}...`
								: name}
						</Typography>
					</Button>
				</Grid>
				<Grid
					item
					xs={false}>
					<IconButton
						size="small"
						 onClick={onMenu(id)}>
						<MoreVertIcon fontSize="small" />
					</IconButton>
					<MenuFolderContext 
						id={`files-menu-folder-context-${id}`}
						entityId={id}
						isDeleted={isDeleted}
						isNotDelete={isNotDelete} />
				</Grid>
			</Grid>
		</Grid>
	</React.Fragment>;
};

FolderDataMap = React.memo(FolderDataMap);
FolderDataMap.defaultProps = {
};
FolderDataMap.propTypes = {
};

let FileDataMap = ({
	id,
	name,
	type,
	path,
	isDeleted,
	isNotDelete,
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const onFile = React.useCallback((id, name) => (e) => {
	}, [
	]);
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`files-menu-file-context-${itemId}`, e.target)();
	}, [
	]);

	return <React.Fragment>
		<Grid
			item
			xs={2}>
			<Grid
				container
				spacing={1}>
				<Grid
					item
					xs={true}>
					<Button
						component="div"
						onClick={onFile(id, name)}
						sx={{
							alignItems: 'flex-end',
							flexDirection: 'column',
							width: '100%',
							height: '100%',
							backgroundColor: '#f7f7f7',
							padding: '0px',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
								backgroundColor: '#f7f7f7',
								...(!loader
									&& (type === 'png'
										|| type === 'jpeg'
										|| type === 'jpg'
										|| type === 'svg'
										|| type === 'gif'))
									? {
										backgroundImage: `url("${process.env.SERVICE_FILES}${path}?accessToken=${localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}")`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
									}
									: {},
									'&:after': {
										content: '""',
										display: 'block',
										paddingBottom: '100%',
									},
								}}>
								{(type === 'pdf')
									? <PictureAsPdfIcon
										sx={{
											fontSize: '500%',
										}} />
									: <React.Fragment />}
							{loader
								? <Loader 
									visible
									wrapper={{
										sx: {
											padding: '0px',
										},
									}}
									sx={{
										minWidth: '80px',
										maxWidth: '80px',
										minHeight: '80px',
										maxHeight: '80px',
									}} />
								: <React.Fragment />}
						</Box>
						<Typography
							component="div"
							variant="body2"
							color={isDeleted
								? 'textSecondary'
								: 'initial'}
							sx={{
								width: '100%',
								padding: '4px 2px',
								textTransform: 'initial',
								wordWrap: 'anywhere',
								textAlign: 'center',
								...isDeleted
									? { textDecoration: 'line-through' }
									: {},
							}}>
							{(name || '').length > 24
								? `${(name || '').substring(0, 24)}...`
								: name}
						</Typography>
					</Button>
				</Grid>
				<Grid
					item
					xs={false}>
					<IconButton
						size="small"
						onClick={onMenu(id)}>
						<MoreVertIcon fontSize="small" />
					</IconButton>
					<MenuFileContext 
						id={`files-menu-file-context-${id}`}
						entityId={id}
						isDeleted={isDeleted}
						isNotDelete={isNotDelete} />
				</Grid>
			</Grid>
		</Grid>
	</React.Fragment>;
};

FileDataMap = React.memo(FileDataMap);
FileDataMap.defaultProps = {
};
FileDataMap.propTypes = {
};

let Manage = () => {
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
								<FolderDataMap { ...folder } />
							</React.Fragment>;
						})}
						{(fileData || []).map((file, i) => {
							return <React.Fragment key={file.id}>
								<FileDataMap { ...file } />
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
};
Manage.propTypes = {
};

export default Manage;
