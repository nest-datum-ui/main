import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FORMS_PATH_FIELD,
	FORMS_PATH_FIELD_OPTION_RELATION, 
} from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import FormsSelectField from '@nest-datum-ui-lib/forms/components/Select/Field';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'fieldId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'errors', 'fieldId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(FORMS_PATH_FIELD, e)({
		entityId: optionId,
		storeListName: FORMS_PATH_FIELD_OPTION_RELATION,
		path: `${FORMS_PATH_FIELD}/${optionId}/option`,
		columnName: 'fieldId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(FORMS_PATH_FIELD, 'fieldId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(FORMS_PATH_FIELD)();
		actionApiFormClear(FORMS_PATH_FIELD)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FORMS_PATH_FIELD}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<FormsSelectField
					disabled={formLoader === true || listLoader === true}
					name="fieldId"
					label="Select field"
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