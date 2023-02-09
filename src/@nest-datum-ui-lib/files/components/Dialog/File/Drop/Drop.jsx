import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { 
	FILES_PATH_FILE,
	FILES_PATH_FOLDER, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FILES_PATH_FILE, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FILE, 'loader' ]));
	const onDrop = React.useCallback((e) => {
		actionApiFormDrop(FILES_PATH_FILE, entityId, {
			allowInsecureDeletion: true,
			forceUpdate: true,
		})();
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={FILES_PATH_FILE}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete file?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current file? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;