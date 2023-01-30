import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { DATA_TYPE_PATH_TYPE_STATUS } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogStatusDrop from '@nest-datum-ui/components/Dialog/Status/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', DATA_TYPE_PATH_TYPE_STATUS, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_STATUS, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE_STATUS, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(DATA_TYPE_PATH_TYPE_STATUS, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogStatusDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={DATA_TYPE_PATH_TYPE_STATUS}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;