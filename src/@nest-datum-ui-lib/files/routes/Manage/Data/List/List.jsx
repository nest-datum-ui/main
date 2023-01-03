import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import DialogFolderStore from '@nest-datum-ui-lib/files/components/Dialog/Folder/Store';
import DialogFolderDrop from '@nest-datum-ui-lib/files/components/Dialog/Folder/Drop';
import DialogFileStore from '@nest-datum-ui-lib/files/components/Dialog/File/Store';
import DialogFileDrop from '@nest-datum-ui-lib/files/components/Dialog/File/Drop';
import FilesPaperManage from '@nest-datum-ui-lib/files/components/Paper/Manage';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'files',
			text: 'Files',
		}, {
			key: '/files/manage',
			text: 'File manager',
		}])();
	}, [
	]);

	return <React.Fragment>
		<FilesPaperManage
			createFolder
			createFile
			filters
			search
			menu>
			<Routes>
				<Route
					path=":entityId"
					element={<React.Fragment>
						<DialogFolderDrop />
						<DialogFolderStore />
						<DialogFileDrop />
						<DialogFileStore />
					</React.Fragment>} />
			</Routes>
		</FilesPaperManage>
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
