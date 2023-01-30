import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FORMS_PATH_FIELD_OPTION_RELATION } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FORMS_PATH_FIELD_OPTION_RELATION, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION_RELATION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD_OPTION_RELATION, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FORMS_PATH_FIELD_OPTION_RELATION, entityId, { sliceInList: true })(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogOptionDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FORMS_PATH_FIELD_OPTION_RELATION}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;