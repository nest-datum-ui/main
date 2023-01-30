import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { SSO_PATH_SETTING } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogSettingDrop from '@nest-datum-ui/components/Dialog/Setting/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', SSO_PATH_SETTING, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_SETTING, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_SETTING, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(SSO_PATH_SETTING, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogSettingDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={SSO_PATH_SETTING}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;