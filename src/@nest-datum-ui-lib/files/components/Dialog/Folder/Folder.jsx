import React from 'react';
import { useSelector } from 'react-redux';
import { FILES_PATH_FOLDER } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Dialog from '@nest-datum-ui/components/Dialog';
import FilesFormFolder from '@nest-datum-ui-lib/files/components/Form/Folder';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';

let Folder = ({ systemId }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', `${FILES_PATH_FOLDER}/form`, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FOLDER}/form`, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'loader' ]));

	return <React.Fragment>
		<Dialog 
			id={`${FILES_PATH_FOLDER}/form`}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title={utilsCheckEntityExists(entityId)
				? 'Update folder'
				: 'Create folder'}>
			<FilesFormFolder 
				entityId={entityId}
				systemId={systemId}
				loader={formLoader === true || listLoader === true} />
		</Dialog>
	</React.Fragment>;
};

Folder = React.memo(Folder);
Folder.defaultProps = {
};
Folder.propTypes = {
};

export default Folder;