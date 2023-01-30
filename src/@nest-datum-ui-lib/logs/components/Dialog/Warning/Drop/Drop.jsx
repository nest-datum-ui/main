import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { LOGS_PATH_WARNING } from '@nest-datum-ui-lib/logs/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', LOGS_PATH_WARNING, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', LOGS_PATH_WARNING, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_WARNING, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(LOGS_PATH_WARNING, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={LOGS_PATH_WARNING}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete log?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current log? This operation is irreversible and may compromise data integrity.
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