import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import FilesFormManager from '@nest-datum-ui-lib/files/components/Form/Manager';
import FilesDialogFolder from '@nest-datum-ui-lib/files/components/Dialog/Folder';
import FilesDialogFile from '@nest-datum-ui-lib/files/components/Dialog/File';
import FilesDialogFolderDrop from '@nest-datum-ui-lib/files/components/Dialog/Folder/Drop';
import FilesDialogFileDrop from '@nest-datum-ui-lib/files/components/Dialog/File/Drop';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesFormManager
			displayBreadcrumbs
			filters
			search
			menu
			createFolder
			createFile />
		<Routes>
			<Route
				path=":entityId"
				element={<React.Fragment>
					<FilesDialogFolder />
					<FilesDialogFile />
					<FilesDialogFolderDrop />
					<FilesDialogFileDrop />
				</React.Fragment>} />
		</Routes>
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
