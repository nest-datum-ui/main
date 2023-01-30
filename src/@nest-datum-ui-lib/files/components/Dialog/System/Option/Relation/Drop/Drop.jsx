import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FILES_PATH_SYSTEM_OPTION_RELATION } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FILES_PATH_SYSTEM_OPTION_RELATION, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM_OPTION_RELATION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FILES_PATH_SYSTEM_OPTION_RELATION, entityId, { sliceInList: true })(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogOptionDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FILES_PATH_SYSTEM_OPTION_RELATION}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;