import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { SSO_PATH_ROLE } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', SSO_PATH_ROLE, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ROLE, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(SSO_PATH_ROLE, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<Dialog 
			id={SSO_PATH_ROLE}
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			title="Delete role?"
			actions={<ButtonSave
				loader={formLoader === true || listLoader === true}
				onClick={onDrop}>
				OK
			</ButtonSave>}>
			<DialogContentText>
				Are you sure you want to delete the current role? This operation is irreversible and may compromise data integrity.
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