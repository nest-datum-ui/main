import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { DATA_TYPE_PATH_TYPE } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', DATA_TYPE_PATH_TYPE, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(DATA_TYPE_PATH_TYPE, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={DATA_TYPE_PATH_TYPE}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete type?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current data type? This operation is irreversible and may compromise data integrity.
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