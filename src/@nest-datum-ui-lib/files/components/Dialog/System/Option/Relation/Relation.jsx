import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FILES_PATH_SYSTEM,
	FILES_PATH_SYSTEM_OPTION_RELATION, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import FilesSelectSystem from '@nest-datum-ui-lib/files/components/Select/System';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'systemId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'errors', 'systemId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(FILES_PATH_SYSTEM, e)({
		entityId: optionId,
		storeListName: FILES_PATH_SYSTEM_OPTION_RELATION,
		path: `${FILES_PATH_SYSTEM}/${optionId}/option`,
		columnName: 'systemId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(FILES_PATH_SYSTEM, 'systemId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(FILES_PATH_SYSTEM)();
		actionApiFormClear(FILES_PATH_SYSTEM)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FILES_PATH_SYSTEM}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<FilesSelectSystem
					disabled={formLoader === true || listLoader === true}
					name="systemId"
					label="Select system"
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