import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormDrop as actionApiFormDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { MAIL_PATH_TEMPLATE_OPTION } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';

let Drop = () => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', MAIL_PATH_TEMPLATE_OPTION, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE_OPTION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_TEMPLATE_OPTION, 'loader' ]));
	const onDrop = React.useCallback((e) => actionApiFormDrop(MAIL_PATH_TEMPLATE_OPTION, entityId)(), [
		entityId,
	]);

	return <React.Fragment>
		<DialogOptionDrop 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={MAIL_PATH_TEMPLATE_OPTION}
			onHandle={onDrop} />
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
};
Drop.propTypes = {
};

export default Drop;