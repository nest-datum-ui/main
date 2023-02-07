import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Grid from '@mui/material/Grid';
import FilesPaper from '@nest-datum-ui-lib/files/components/Paper';
import FilesPaperFolder from '@nest-datum-ui-lib/files/components/Paper/Folder';

let Manager = ({ 
	storeListName,
	wrapperProps, 
	systemId,
	query,
	select,
	filter,
	sort,
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const folderDataParentId = useSelector(selectorMainExtract([ 'api', 'list', storeListName, 'data', 0, 'id' ]));
	const folderData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'data' ]));
	const fileData = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'data' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'total' ]));
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 60;
	const allowLoadFolders = ((total >= limit * page) 
		|| !utilsCheckNumericInt(total));
	const parentId = (systemId === 'files-system-default')
		? 'files-folder-root'
		: folderDataParentId;

	React.useEffect(() => {
		if (systemId && systemId !== 'files-system-default') {
			actionApiListGet(FILES_PATH_FOLDER, {
				storeListName,
				page: 1,
				limit: 1,
				filter: {
					systemId,
				},
			})();
		}
	}, [
		storeListName,
		systemId,
	]);

	React.useEffect(() => {
		handlerMount({
			unmount,
			systemId,
			query,
			select,
			filter,
			sort,
			folderPage: page,
			folderLimit: limit,
			allowLoadFolders,
			parentId,
		});
	}, [
		unmount,
		systemId,
		query,
		select,
		filter,
		sort,
		page,
		limit,
		allowLoadFolders,
		parentId,
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
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	wrapperProps: {},
};
Manager.propTypes = {
	wrapperProps: PropTypes.object,
};

export default Manager;
