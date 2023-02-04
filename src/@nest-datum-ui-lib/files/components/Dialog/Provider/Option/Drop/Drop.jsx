import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { FILES_PATH_PROVIDER_OPTION } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', FILES_PATH_PROVIDER_OPTION, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER_OPTION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(FILES_PATH_PROVIDER_OPTION, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogOptionDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FILES_PATH_PROVIDER_OPTION}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;