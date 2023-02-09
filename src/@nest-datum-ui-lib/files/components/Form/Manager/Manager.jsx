import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireListPush as actionBreadcrumbsListPush } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/push.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import { fireListDrop as actionApiListDrop } from '@nest-datum-ui/components/Store/api/actions/list/drop.js';
import { fireListRestore as actionApiListRestore } from '@nest-datum-ui/components/Store/api/actions/list/restore.js';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Store from '@nest-datum-ui/components/Store';
import FormFilter from '@nest-datum-ui/components/Form/Filter';
import FilesInputSystem from '@nest-datum-ui-lib/files/components/Input/System';
import FilesMenuBreadcrumbs  from '@nest-datum-ui-lib/files/components/Menu/Breadcrumbs';
import FilesListManagerPagination from '@nest-datum-ui-lib/files/components/List/Manager/Pagination';
import FilesButtonFolder from '@nest-datum-ui-lib/files/components/Button/Folder';
import FilesButtonFile from '@nest-datum-ui-lib/files/components/Button/File';
import FilesDialogFolder from '@nest-datum-ui-lib/files/components/Dialog/Folder';
import FilesDialogFile from '@nest-datum-ui-lib/files/components/Dialog/File';
import FilesDialogFolderDrop from '@nest-datum-ui-lib/files/components/Dialog/Folder/Drop';
import FilesDialogFileDrop from '@nest-datum-ui-lib/files/components/Dialog/File/Drop';
import FormFilterIsDeleted from '@nest-datum-ui/components/Form/Filter/IsDeleted';
import FormFilterIsNotDelete from '@nest-datum-ui/components/Form/Filter/IsNotDelete';
import handlerMount from './handler/mount.js';
import handlerMountList from './handler/mountList.js';
import handlerMountAllowLoadList from './handler/mountAllowLoadList.js';
import handlerFileUpload from './handler/fileUpload.js';
import handlerMountParent from './handler/mountParent.js';

let Panel = ({
	storeListName, 
	systemId,
	displayBreadcrumbs, 
	displayCreateFolder,
	displayCreateFile,
	displayFilters,
	displaySearch,
	length,
}) => {
	const onFolderBreadcrumbs = React.useCallback((e, { id, index }) => {
		actionApiListClear(`${storeListName}parent`)();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();

		const breadcrumbs = (Store()
			.getState()['breadcrumbs']
			.list
			.filesManageList || {})
			.data || [];

		actionBreadcrumbsListSet('filesManageList', [ ...breadcrumbs.slice(0, index) ])();
	}, [
		storeListName,
	]);
	const onFolderForm = React.useCallback(() => actionDialogOpen(`${FILES_PATH_FOLDER}/form`)(), [
	]);
	const onFileUpload = React.useCallback((e) => handlerFileUpload(e, {
		systemId,
	}), [
		systemId,
	]);

	return <React.Fragment>
		{displayBreadcrumbs
			&& <Box pb={1}>
				<FilesMenuBreadcrumbs onClick={onFolderBreadcrumbs} />
			</Box>}
		{displayFilters
			&& <FormFilter 
				length={length}
				{ ...(displayCreateFolder || displayCreateFile)
					? {
						toolbarComponent: <Grid
							container
							alignItems="center"
							spacing={2}>
							{displayCreateFolder
								&& <Grid
									item
									xs={false}>
									<FilesButtonFolder onClick={onFolderForm} />
								</Grid>}
							{displayCreateFile
								&& <Grid
									item
									xs={false}>
									<FilesButtonFile onChange={onFileUpload} />
								</Grid>}
						</Grid>,
					}
					: {} }>
				<FormFilterIsDeleted onInput={actionApiListProp(FILES_PATH_FOLDER, 'loader', true)} />
				<FormFilterIsNotDelete onInput={actionApiListProp(FILES_PATH_FOLDER, 'loader', true)} />
			</FormFilter>}
	</React.Fragment>;
};

Panel = React.memo(Panel);

let Manager = ({
	storeListName,
	defaultParentId,
	withSelect,
	displayCreateFolder,
	displayCreateFile,
	displayMenu,
	displayFilters,
	displaySearch,
	label,
	labelWrapperProps,
	labelProps,
	systemWrapperProps,
	systemProps,
	onChangeSystem,
	onFile,
	displayBreadcrumbs,
}) => {
	const { search: locationSearch } = useLocation();
	const query = utilsUrlSearchPathItem('query', locationSearch);
	const select = utilsUrlSearchPathItem('select', locationSearch);
	const filter = utilsUrlSearchPathItem('filter', locationSearch);
	const sort = utilsUrlSearchPathItem('sort', locationSearch);
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', storeListName, 'systemId' ]));
	const prevSystemId = useSelector(selectorMainExtract([ 'api', 'form', storeListName, 'prevSystemId' ]));
	const folderDataParent = useSelector(selectorMainExtract([ 'api', 'list', `${storeListName}parent`, 'data' ]));
	const key = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ], (data = []) => (data[data.length - 1] || {}).key));
	const allowLoadList = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'allowLoadList' ]));
	const folderDataLength = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'data', 'length' ])) ?? 0;
	const fileDataLength = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'data', 'length' ])) ?? 0;
	const folderTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const fileTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'total' ]));
	const generalTotal = (folderTotal || 0) + (fileTotal || 0);
	const [ parentId, setParentId ] = React.useState(() => undefined);
	const [ initParentId, setInitParentId ] = React.useState(() => undefined);
	const fetchedInitParentId = ((folderDataParent || [])[0] || {}).id;
	const onFolderPagination = React.useCallback((e, { 
		id,
		name,
		path, 
	}) => {
		actionApiListClear(`${storeListName}parent`)();
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
		actionBreadcrumbsListPush('filesManageList', { 
			key: id,
			text: name, 
			path,
		})();
	}, [
		storeListName,
	]);
	const onChangeSystemLocal = React.useCallback((e) => {
		actionApiFormProp(storeListName, 'prevSystemId', systemId)();
		actionApiFormProp(storeListName, 'prevSystemIdMemo', systemId)();
		actionApiListClear(`${storeListName}parent`)();
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
		onChangeSystem(e);
		setInitParentId(undefined);
		setParentId(undefined);
	}, [
		storeListName,
		systemId,
		onChangeSystem,
		setInitParentId,
		setParentId,
	]);
	const onMenu = React.useCallback((e, id) => displayMenu && actionMenuOpen(id, e.target)(), [
		displayMenu,
	]);
	const onFileDrop = React.useCallback((e, id) => actionApiListDrop(FILES_PATH_FILE, id), [
	]);
	const onFileRestore = React.useCallback((id) => (e) => actionApiListRestore(FILES_PATH_FILE, id), [
	]);
	const onFileEdit = React.useCallback((e, id) => actionDialogOpen(`${FILES_PATH_FILE}/form`, { entityId: id })(), [
	]);
	const onFolderDrop = React.useCallback((e, id) => actionApiListDrop(FILES_PATH_FOLDER, id), [
	]);
	const onFolderRestore = React.useCallback((e, id) => actionApiListRestore(FILES_PATH_FOLDER, id), [
	]);
	const onFolderEdit = React.useCallback((e, id) => actionDialogOpen(`${FILES_PATH_FOLDER}/form`, { entityId: id })(), [
	]);

	React.useEffect(() => {
		handlerMountList(key, setParentId);
	}, [
		key,
		setParentId,
	]);

	React.useEffect(() => {
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
	}, [
		query,
		select,
		filter,
		sort,
	]);

	React.useEffect(() => {
		handlerMountAllowLoadList(allowLoadList);
	}, [
		allowLoadList,
	]);

	React.useEffect(() => {
		handlerMount({
			storeListName,
			displayBreadcrumbs,
			parentId: initParentId,
			systemId,
			key,
		});
	}, [
		storeListName,
		displayBreadcrumbs,
		initParentId,
		systemId,
		key,
	]);

	React.useEffect(() => {
		handlerMountParent({
			storeListName,
			systemId,
			fetchedInitParentId,
		});
	}, [
		storeListName,
		systemId,
		fetchedInitParentId,
	]);

	React.useEffect(() => {
		if (fetchedInitParentId
			&& systemId) {
			const newParentId = !parentId
				? ((prevSystemId && prevSystemId !== systemId)
					? (fetchedInitParentId || key)
					: (key || fetchedInitParentId))
				: (parentId !== fetchedInitParentId)
					? parentId
					: fetchedInitParentId;

			actionApiFormProp(storeListName, 'prevSystemId', undefined)();
			setParentId(newParentId);
			setInitParentId((prevFetchedInitParentId) => {
				if (!prevFetchedInitParentId
					|| (fetchedInitParentId
						&& prevFetchedInitParentId !== fetchedInitParentId)) {
					return fetchedInitParentId;
				}
				return prevFetchedInitParentId;
			});
		}
		else if (!fetchedInitParentId) {
			actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
			actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
			setParentId(undefined);
		}
	}, [
		storeListName,
		fetchedInitParentId,
		systemId,
		prevSystemId,
		parentId,
		setInitParentId,
		setParentId,
		key,
	]);

	return <React.Fragment>
		<Grid
			container
			spacing={3}
			alignItems="center">
			{label
				&& <Grid
					item
					xs={false}
					{ ...labelWrapperProps }>
					<Typography
						component="div"
						variant="h5"
						{ ...labelProps }>
						{label}
					</Typography>
				</Grid>}
			<Grid
				item
				xs={12}
				sm={12}
				md={4}
				lg={2}
				{ ...systemWrapperProps }>
				<FilesInputSystem 
					storeFormName={storeListName}
					label="Select file system"
					onChange={onChangeSystemLocal}
					{ ...systemProps } />
			</Grid>
		</Grid>
		{systemId
			&& <React.Fragment>
				<Panel
					storeListName={storeListName}
					displayBreadcrumbs={displayBreadcrumbs}
					displayCreateFolder={displayCreateFolder}
					displayCreateFile={displayCreateFile}
					displayFilters={displayFilters}
					displaySearch={displaySearch}
					systemId={systemId}
					length={Number((folderDataLength + fileDataLength) ?? 0)} />
				{(allowLoadList && initParentId && fetchedInitParentId && parentId)
					&& <React.Fragment>
						<FilesListManagerPagination 
							storeListName={storeListName}
							systemId={systemId}
							parentId={parentId}
							displayMenu={displayMenu}
							query={query}
							select={select}
							filter={filter}
							sort={sort}
							total={generalTotal}
							onMenu={onMenu}
							onFile={onFile}
							onFileDrop={onFileDrop}
							onFileRestore={onFileRestore}
							onFileEdit={onFileEdit}
							onFolder={onFolderPagination}
							onFolderDrop={onFolderDrop}
							onFolderRestore={onFolderRestore}
							onFolderEdit={onFolderEdit}
							withSelect={withSelect} />
					</React.Fragment>}
				<FilesDialogFolder systemId={systemId} />
				<FilesDialogFile systemId={systemId} />
				<FilesDialogFolderDrop />
				<FilesDialogFileDrop />
			</React.Fragment>}
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	storeListName: FILES_KEY_MANAGER,
	labelWrapperProps: {},
	labelProps: {},
	systemWrapperProps: {},
	systemProps: {},
	onChangeSystem: (() => {}),
	onFile: (() => {}),
	displayBreadcrumbs: false,
	displayMenu: false,
};
Manager.propTypes = {
	storeListName: PropTypes.string,
	label: PropTypes.string,
	labelWrapperProps: PropTypes.object,
	labelProps: PropTypes.object,
	systemWrapperProps: PropTypes.object,
	systemProps: PropTypes.object,
	onChangeSystem: PropTypes.func,
	displayBreadcrumbs: PropTypes.bool,
	defaultParentId: PropTypes.string,
	displayCreateFolder: PropTypes.bool,
	displayCreateFile: PropTypes.bool,
	displayMenu: PropTypes.bool,
	displayFilters: PropTypes.bool,
	displaySearch: PropTypes.bool,
	onFile: PropTypes.func,
	withSelect: PropTypes.bool,
};

export default Manager;
