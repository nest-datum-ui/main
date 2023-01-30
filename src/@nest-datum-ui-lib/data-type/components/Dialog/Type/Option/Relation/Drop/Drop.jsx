import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { DATA_TYPE_PATH_TYPE_OPTION_RELATION } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', DATA_TYPE_PATH_TYPE_OPTION_RELATION, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_OPTION_RELATION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE_OPTION_RELATION, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(DATA_TYPE_PATH_TYPE_OPTION_RELATION, entityId, { sliceInList: true })(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogOptionDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={DATA_TYPE_PATH_TYPE_OPTION_RELATION}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;