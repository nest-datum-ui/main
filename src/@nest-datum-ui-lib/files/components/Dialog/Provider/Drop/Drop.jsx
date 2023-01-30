import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FILES_PATH_PROVIDER } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FILES_PATH_PROVIDER, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FILES_PATH_PROVIDER, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={FILES_PATH_PROVIDER}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete provider?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current provider? This operation is irreversible and may compromise data integrity.
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