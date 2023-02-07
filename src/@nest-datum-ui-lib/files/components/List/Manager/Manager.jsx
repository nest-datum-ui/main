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
import FilesPaper from '@nest-datum-ui-lib/files/components/Paper';
import FilesPaperFolder from '@nest-datum-ui-lib/files/components/Paper/Folder';
import handlerMountParent from './handler/mountParent.js';
import handlerMount from './handler/mount.js';

let Manager = ({ 
	storeListName,
	wrapperProps, 
	systemId,
	parentId,
	query,
	select,
	filter,
	sort,
	onFile,
	onFolder,
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
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
		<Grid
			container
			spacing={3}
			sx={{
				paddingBottom: '24px',
			}}
			{ ...wrapperProps }>
			{(folderData || []).map((item) => <Grid
				key={item.id}
				item
				xs={1}>
				<FilesPaperFolder
					id={item.id}
					path={item.path}
					name={item.name}
					onClick={onFolder} />
			</Grid>)}
			{(fileData || []).map((item) => <Grid
				key={item.id}
				item
				xs={1}>
				<FilesPaper
					path={item.path}
					name={item.name}
					size={item.size}
					onClick={onFile} />
			</Grid>)}
		</Grid>
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	storeListName: FILES_KEY_MANAGER,
	wrapperProps: {},
	parentId: 'files-folder-root',
	onFile: (() => {}),
	onFolder: (() => {}),
};
Manager.propTypes = {
	storeListName: PropTypes.string,
	wrapperProps: PropTypes.object,
	systemId: PropTypes.string.isRequired,
	parentId: PropTypes.string,
	query: PropTypes.string,
	select: PropTypes.object,
	filter: PropTypes.object,
	sort: PropTypes.object,
	onFile: PropTypes.func,
	onFolder: PropTypes.func,
};

export default Manager;
