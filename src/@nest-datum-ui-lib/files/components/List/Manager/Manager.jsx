import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckNumericInt from '@nest-datum-ui/utils/check/numeric/int.js';
import Grid from '@mui/material/Grid';
import Loader from '@nest-datum-ui/components/Loader';
import FilesPaper from '@nest-datum-ui-lib/files/components/Paper';
import FilesPaperFolder from '@nest-datum-ui-lib/files/components/Paper/Folder';
import FilesPaperMenu from '@nest-datum-ui-lib/files/components/Paper/Menu';
import FilesPaperFolderMenu from '@nest-datum-ui-lib/files/components/Paper/Folder/Menu';
import handlerMountParent from './handler/mountParent.js';
import handlerMount from './handler/mount.js';

let Manager = ({ 
	storeListName,
	wrapperProps, 
	displayMenu,
	systemId,
	parentId,
	withSelect,
	query,
	select,
	filter,
	sort,
	onMenu,
	onFile,
	onFileDrop,
	onFileRestore,
	onFileEdit,
	onFolder,
	onFolderDrop,
	onFolderRestore,
	onFolderEdit,
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'loader' ]));
	const folderData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'data' ]));
	const fileData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'data' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 60;
	const allowLoadFiles = limit > (folderData || []).length 
		&& utilsCheckArr(folderData);
	const allowLoadFolders = (total >= limit * page) 
		|| !utilsCheckNumericInt(total);
	const allowLoadFoldersFull = allowLoadFolders || total <= limit;
	
	React.useEffect(() => {
		handlerMountParent({
			storeListName,
			systemId,
			parentId,
		});
	}, [
		storeListName,
		systemId,
		parentId,
	]);

	React.useEffect(() => {
		handlerMount({
			storeListName,
			unmount,
			systemId,
			parentId,
			query,
			select,
			filter,
			sort,
			page,
			limit,
			allowLoadFolders,
			allowLoadFoldersFull,
			allowLoadFiles,
		});
	}, [
		storeListName,
		unmount,
		systemId,
		parentId,
		query,
		select,
		filter,
		sort,
		page,
		limit,
		allowLoadFolders,
		allowLoadFoldersFull,
		allowLoadFiles,
	]);

	return <React.Fragment>
		<Loader visible={loader || loader === undefined} />
		<Grid
			container
			spacing={3}
			sx={{
				paddingBottom: '24px',
				display: (loader || loader === undefined)
					? 'none'
					: 'flex',
			}}
			{ ...wrapperProps }>
			{(folderData || []).map((item) => <Grid
				key={item.id}
				item
				xs={1}>
				{displayMenu
					? <FilesPaperFolderMenu
						id={item.id}
						isDeleted={item.isDeleted}
						isNotDelete={item.isNotDelete}
						path={item.path}
						name={item.name}
						onClick={onFolder}
						onMenu={onMenu}
						onDrop={onFolderDrop}
						onRestore={onFolderRestore}
						onEdit={onFolderEdit} />
					: <FilesPaperFolder
						id={item.id}
						isDeleted={item.isDeleted}
						isNotDelete={item.isNotDelete}
						path={item.path}
						name={item.name}
						onClick={onFolder} />}
			</Grid>)}
			{(fileData || []).map((item) => <Grid
				key={item.id}
				item
				xs={1}>
				{displayMenu
					? <FilesPaperMenu
						withSelect={withSelect}
						id={item.id}
						isDeleted={item.isDeleted}
						isNotDelete={item.isNotDelete}
						path={item.path}
						name={item.name}
						size={item.size}
						onClick={onFile}
						onMenu={onMenu}
						onDrop={onFileDrop}
						onRestore={onFileRestore}
						onEdit={onFileEdit} />
					: <FilesPaper
						withSelect={withSelect}
						id={item.id}
						isDeleted={item.isDeleted}
						isNotDelete={item.isNotDelete}
						path={item.path}
						name={item.name}
						size={item.size}
						onClick={onFile} />}
			</Grid>)}
		</Grid>
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	storeListName: FILES_KEY_MANAGER,
	wrapperProps: {},
	onFile: (() => {}),
	onFolder: (() => {}),
};
Manager.propTypes = {
	storeListName: PropTypes.string,
	wrapperProps: PropTypes.object,
	systemId: PropTypes.string.isRequired,
	parentId: PropTypes.string,
	withSelect: PropTypes.bool,
	query: PropTypes.string,
	select: PropTypes.object,
	filter: PropTypes.object,
	sort: PropTypes.object,
	onFolder: PropTypes.func,
	displayMenu: PropTypes.bool,
};

export default Manager;
