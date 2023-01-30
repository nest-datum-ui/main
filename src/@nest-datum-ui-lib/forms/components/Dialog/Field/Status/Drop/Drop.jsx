import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FORMS_PATH_FIELD_STATUS } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogStatusDrop from '@nest-datum-ui/components/Dialog/Status/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FORMS_PATH_FIELD_STATUS, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_STATUS, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD_STATUS, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FORMS_PATH_FIELD_STATUS, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogStatusDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FORMS_PATH_FIELD_STATUS}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;