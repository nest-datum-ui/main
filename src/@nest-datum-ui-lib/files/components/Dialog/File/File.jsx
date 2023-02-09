import React from 'react';
import { useSelector } from 'react-redux';
import { 
	FILES_PATH_FOLDER,
	FILES_PATH_FILE, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Dialog from '@nest-datum-ui/components/Dialog';
import FilesFormFile from '@nest-datum-ui-lib/files/components/Form/File';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';

let File = ({ systemId }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', `${FILES_PATH_FILE}/form`, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/form`, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'loader' ]));

	return <React.Fragment>
		<Dialog 
			id={`${FILES_PATH_FILE}/form`}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title={utilsCheckEntityExists(entityId)
				? 'Update file'
				: 'Create file'}>
			<FilesFormFile 
				entityId={entityId}
				systemId={systemId}
				loader={formLoader === true || listLoader === true} />
		</Dialog>
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
};
File.propTypes = {
};

export default File;