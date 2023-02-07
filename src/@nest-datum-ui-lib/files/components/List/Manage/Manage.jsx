import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireFormEmpty as actionApiFormEmpty } from '@nest-datum-ui/components/Store/api/actions/form/empty.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
	FILES_PATH_SYSTEM,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import utilsCheckNumericInt from '@nest-datum-ui/utils/check/numeric/int.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Store from '@nest-datum-ui/components/Store';
import Pagination from '@nest-datum-ui/components/Pagination';
import FilesInputSystem from '@nest-datum-ui-lib/files/components/Input/System';
import FilesPaper from '@nest-datum-ui-lib/files/components/Paper';
import FilesPaperFolder from '@nest-datum-ui-lib/files/components/Paper/Folder';
import FilesMenuBreadcrumbs  from '@nest-datum-ui-lib/files/components/Menu/Breadcrumbs';
import handlerMount from './handler/mount.js';

let Manage = ({
	storeListName,
	createFolder,
	createFile,
	filters,
	search,
	menu,
	label,
	labelWrapperProps,
	labelProps,
	systemId,
	systemWrapperProps,
	systemProps,
	onChangeSystem,
}) => {
	const { search: locationSearch } = useLocation();
	const query = utilsUrlSearchPathItem('query', locationSearch);
	const select = utilsUrlSearchPathItem('select', locationSearch);
	const filter = utilsUrlSearchPathItem('filter', locationSearch);
	const sort = utilsUrlSearchPathItem('sort', locationSearch);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const systemIdLocal = useSelector(selectorMainExtract([ 'api', 'form', storeListName, 'systemId' ]));
	const folderDataParent = useSelector(selectorMainExtract([ 'api', 'list', storeListName, 'data' ]));
	const folderData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'data' ]));
	const folderTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const folderPage = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const folderLimit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 60;
	const fileData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'data' ]));
	const fileTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'total' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ])) || [];
	const allowLoadFolders = ((folderTotal >= folderLimit * folderPage) || !utilsCheckNumericInt(folderTotal));
	const generalTotal = (folderTotal || 0) + (fileTotal || 0);
	const parentId = ((folderDataParent || [])[0] || {})['id'];
	const system = useSelector(selectorFindArray([ 'api', 'list', FILES_PATH_SYSTEM, 'data' ], (item) => item['id'] === systemIdLocal));
	const systemSystemOption = ((system || {})['systemSystemOptions'] || []).find((item) => item['systemOptionId'] === 'files-system-option-root');
	const systemSystemOptionContent = systemSystemOption
		? (systemSystemOption['systemSystemSystemOptions'] || []).find((item) => item['systemSystemOptionId'] === systemSystemOption['id'])
		: undefined;
	const rootPath = (breadcrumbs[breadcrumbs.length - 1] || {}).path
		|| (systemSystemOptionContent || {})['content'];
	const onPage = React.useCallback((e, newPage) => {
		actionApiListProp(FILES_PATH_FOLDER, 'data', [])();
		actionApiListPage(FILES_PATH_FOLDER, newPage);
	}, [
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListLimit(FILES_PATH_FOLDER, e);
		actionApiListPage(FILES_PATH_FOLDER, 1);
	}, [
	]);

	React.useEffect(() => {
		actionApiFormEmpty(storeListName, { systemId, page: 1 })();
	}, [
		storeListName,
		systemId,
	]);

	React.useEffect(() => {
		if (rootPath && parentId) {
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
		if (systemIdLocal && rootPath) {
			actionApiListGet(FILES_PATH_FOLDER, {
				storeListName,
				page: 1,
				limit: 1,
				filter: {
					systemId: systemIdLocal,
					path: rootPath,
				},
			})();
		}
	}, [
		storeListName,
		systemIdLocal,
		rootPath,
	]);

	React.useEffect(() => {
		handlerMount({
			unmount,
			systemId: systemIdLocal,
			query,
			select,
			filter,
			sort,
			folderPage,
			folderLimit,
			allowLoadFolders,
			parentId,
			rootPath,
		});
	}, [
		unmount,
		systemIdLocal,
		query,
		select,
		filter,
		sort,
		folderPage,
		folderLimit,
		allowLoadFolders,
		parentId,
		rootPath,
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
					onChange={onChangeSystem} />
			</Grid>
		</Grid>
		{systemIdLocal
			&& <React.Fragment>
				<Box pb={1}>
					<FilesMenuBreadcrumbs />
				</Box>
				<Grid
					container
					spacing={3}
					sx={{
						paddingBottom: '24px',
					}}>
					{(folderData || []).map((item) => <Grid
						key={item.id}
						item
						xs={1}>
						<FilesPaperFolder
							id={item.id}
							path={item.path}
							name={item.name} />
					</Grid>)}
					{(fileData || []).map((item) => <Grid
						key={item.id}
						item
						xs={1}>
						<FilesPaper
							path={item.path}
							name={item.name}
							size={item.size} />
					</Grid>)}
				</Grid>
				{generalTotal > 0
					&& <Pagination
						withChangeLimit
						total={generalTotal}
						page={folderPage}
						limit={folderLimit}
						onChange={onPage}
						onLimit={onLimit} />}
			</React.Fragment>}
	</React.Fragment>;
};

Manage = React.memo(Manage);
Manage.defaultProps = {
	storeListName: FILES_KEY_MANAGER,
	labelWrapperProps: {},
	labelProps: {},
	systemWrapperProps: {},
	systemProps: {},
	onChangeSystem: (() => {}),
	systemId: '',
};
Manage.propTypes = {
	storeListName: PropTypes.string,
	createFolder: PropTypes.bool,
	createFile: PropTypes.bool,
	filters: PropTypes.bool,
	search: PropTypes.bool,
	menu: PropTypes.bool,
	label: PropTypes.string,
	labelWrapperProps: PropTypes.object,
	labelProps: PropTypes.object,
	systemId: PropTypes.string,
	systemWrapperProps: PropTypes.object,
	systemProps: PropTypes.object,
	onChangeSystem: PropTypes.func,
};

export default Manage;
