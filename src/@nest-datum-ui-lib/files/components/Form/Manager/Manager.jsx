import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListPush as actionBreadcrumbsListPush } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/push.js';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FilesInputSystem from '@nest-datum-ui-lib/files/components/Input/System';
import FilesMenuBreadcrumbs  from '@nest-datum-ui-lib/files/components/Menu/Breadcrumbs';
import FilesListManagerPagination from '@nest-datum-ui-lib/files/components/List/Manager/Pagination';
import handlerMount from './handler/mount.js';

let Manager = ({
	storeListName,
	defaultParentId,
	createFolder,
	createFile,
	menu,
	filters,
	search,
	label,
	labelWrapperProps,
	labelProps,
	systemWrapperProps,
	systemProps,
	onChangeSystem,
	displayBreadcrumbs,
}) => {
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', storeListName, 'systemId' ]));
	const key = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ], (data = []) => (data[data.length - 1] || {}).key));
	const folderTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const fileTotal = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'total' ]));
	const generalTotal = (folderTotal || 0) + (fileTotal || 0);
	const [ parentId, setParentId ] = React.useState(() => defaultParentId);
	const onFolder = React.useCallback((e, { 
		id,
		name,
		path, 
	}) => {
		actionBreadcrumbsListPush('filesManageList', { 
			key: id,
			text: name, 
			path,
		})();
	}, [
	]);

	React.useEffect(() => {
		if (key) {
			setParentId(key);
		}
	}, [
		key,
	]);

	React.useEffect(() => {
		handlerMount({
			displayBreadcrumbs,
			parentId,
			systemId,
			key,
		});
	}, [
		displayBreadcrumbs,
		parentId,
		systemId,
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
					onChange={onChangeSystem}
					{ ...systemProps } />
			</Grid>
		</Grid>
		{systemId
			&& <React.Fragment>
				{displayBreadcrumbs
					&& <Box pb={1}>
						<FilesMenuBreadcrumbs />
					</Box>}
				<FilesListManagerPagination 
					systemId={systemId}
					parentId={parentId}
					total={generalTotal}
					onFolder={onFolder} />
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
	displayBreadcrumbs: false,
	menu: false,
	defaultParentId: 'files-folder-root',
};
Manager.propTypes = {
	storeListName: PropTypes.string,
	createFolder: PropTypes.bool,
	createFile: PropTypes.bool,
	menu: PropTypes.bool,
	filters: PropTypes.bool,
	search: PropTypes.bool,
	label: PropTypes.string,
	labelWrapperProps: PropTypes.object,
	labelProps: PropTypes.object,
	systemWrapperProps: PropTypes.object,
	systemProps: PropTypes.object,
	onChangeSystem: PropTypes.func,
	displayBreadcrumbs: PropTypes.bool,
	defaultParentId: PropTypes.string,
};

export default Manager;
