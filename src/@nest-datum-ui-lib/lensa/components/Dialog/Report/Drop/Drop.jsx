import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { LENSA_PATH_REPORT } from '@nest-datum-ui-lib/lensa/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', LENSA_PATH_REPORT, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', LENSA_PATH_REPORT, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', LENSA_PATH_REPORT, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(LENSA_PATH_REPORT, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={LENSA_PATH_REPORT}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete report?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current report? This operation is irreversible and may compromise data integrity.
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