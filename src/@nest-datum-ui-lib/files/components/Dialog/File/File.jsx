import React from 'react';
import { useSelector } from 'react-redux';
// import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
// import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
// import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FILES_PATH_FILE,
	FILES_PATH_FOLDER, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
// import Box from '@mui/material/Box';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let File = () => {
	// const value = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'typeId' ])) ?? '';
	// const error = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'errors', 'typeId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'loader' ]));
	const onSubmit = React.useCallback((e) => {}, [
	]);
	// const onChange = React.useCallback((e) => {}, [
	// ]);
	// const onClose = React.useCallback(() => {
	// 	actionDialogClose(FILES_PATH_FILE)();
	// 	actionApiFormClear(FILES_PATH_FILE)();
	// }, [
	// ]);

	return <React.Fragment>
		<Dialog 
			id={FILES_PATH_FILE}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Upload file"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onSubmit}>
				OK
			</ButtonSave>}>
			File
		</Dialog>
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
};
File.propTypes = {
};

export default File;