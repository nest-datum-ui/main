import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireFormEmpty as actionApiFormEmpty } from '@nest-datum-ui/components/Store/api/actions/form/empty.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckNumericInt from '@nest-datum-ui/utils/check/numeric/int.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@nest-datum-ui/components/Pagination';
import FilesInputSystem from '@nest-datum-ui-lib/files/components/Input/System';
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
	const folderData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'data' ]));
	const folderTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const folderPage = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const folderLimit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 20;
	const fileData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'data' ]));
	const fileTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'total' ]));
	const allowLoadFolders = ((folderTotal >= folderLimit * folderPage) || !utilsCheckNumericInt(folderTotal));
	const generalTotal = (folderTotal || 0) + (fileTotal || 0);
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
				<Grid
					container
					alignItems="center"
					spacing={2}>
					{(folderData || []).map((item) => <Grid
						key={item.id}
						item
						xs={2}>
						folder
					</Grid>)}
					{(fileData || []).map((item) => <Grid
						key={item.id}
						item
						xs={2}>
						file
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
