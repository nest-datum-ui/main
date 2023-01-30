import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FILES_PATH_PROVIDER,
	FILES_PATH_PROVIDER_OPTION_RELATION, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import FilesSelectProvider from '@nest-datum-ui-lib/files/components/Select/Provider';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'providerId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'errors', 'providerId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(FILES_PATH_PROVIDER, e)({
		entityId: optionId,
		storeListName: FILES_PATH_PROVIDER_OPTION_RELATION,
		path: `${FILES_PATH_PROVIDER}/${optionId}/option`,
		columnName: 'providerId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(FILES_PATH_PROVIDER, 'providerId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(FILES_PATH_PROVIDER)();
		actionApiFormClear(FILES_PATH_PROVIDER)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FILES_PATH_PROVIDER}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<FilesSelectProvider
					disabled={formLoader === true || listLoader === true}
					name="providerId"
					label="Select provider"
					value={value}
					onChange={onChange}
					error={error} />
			</Box>
		</DialogOptionRelation>
	</React.Fragment>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
	optionId: PropTypes.string.isRequired,
};

export default Relation;