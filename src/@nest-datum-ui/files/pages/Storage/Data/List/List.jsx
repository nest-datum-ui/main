import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuBreadcrumbs from '@nest-datum-ui/files/components/Menu/Breadcrumbs';
import MenuManage from '@nest-datum-ui/files/components/Menu/Manage';
import ListStorage from '@nest-datum-ui/files/components/List/Storage';
import DialogStorageFolderCreate from '@nest-datum-ui/files/components/Dialog/Storage/Folder/Create';
import DialogStorageFolderUpdate from '@nest-datum-ui/files/components/Dialog/Storage/Folder/Update';
import DialogStorageFolderDrop from '@nest-datum-ui/files/components/Dialog/Storage/Folder/Drop';
import DialogStorageFileUpdate from '@nest-datum-ui/files/components/Dialog/Storage/File/Update';
import DialogStorageFileDrop from '@nest-datum-ui/files/components/Dialog/Storage/File/Drop';

let List = () => {
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const serviceName = (service || {}).name;

	React.useEffect(() => {
		if (serviceName
			&& serviceKey) {
			actionBreadcrumbsListSet('app', [{
				key: '/',
				text: '...',
			}, {
				key: serviceKey,
				text: serviceName,
			}])();
		}
	}, [
		serviceName,
		serviceKey,
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Список файлов
			</Typography>
		</Box>
		<Box pb={2}>
			<MenuBreadcrumbs />
		</Box>
		<Box 
			overflow="hidden"
			pb={4}>
			<MenuManage />
		</Box>
		<Box overflow="hidden">
			<ListStorage />
		</Box>
		<DialogStorageFolderCreate />
		<DialogStorageFolderUpdate />
		<DialogStorageFolderDrop />
		<DialogStorageFileUpdate />
		<DialogStorageFileDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
