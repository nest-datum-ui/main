import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { MAIL_PATH_TEMPLATE } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', MAIL_PATH_TEMPLATE, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_TEMPLATE, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(MAIL_PATH_TEMPLATE, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={MAIL_PATH_TEMPLATE}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete template?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current template? This operation is irreversible and may compromise data integrity.
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