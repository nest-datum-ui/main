import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FORMS_PATH_FIELD } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FORMS_PATH_FIELD, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FORMS_PATH_FIELD, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={FORMS_PATH_FIELD}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete field?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current field? This operation is irreversible and may compromise data integrity.
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