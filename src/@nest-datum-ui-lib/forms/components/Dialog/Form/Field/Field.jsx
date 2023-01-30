import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FORMS_PATH_FIELD,
	FORMS_PATH_FORM_FIELD,
	FORMS_PATH_FORM,
} from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import FormsSelectField from '@nest-datum-ui-lib/forms/components/Select/Field';

let Field = ({ formId }) => {
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'loader' ]));
	const fieldId = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'fieldId' ])) ?? '';
	const errorFieldId = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'errors', 'fieldId' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(FORMS_PATH_FIELD, e)({
		entityId: formId,
		storeListName: FORMS_PATH_FORM_FIELD,
		path: `${FORMS_PATH_FORM}/${formId}/field`,
		columnName: 'fieldId',
	}), [
		formId,
	]);
	const onChangeField = React.useCallback((e) => actionApiFormProp(FORMS_PATH_FIELD, 'fieldId', e.target.value)(), [
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
					value={fieldId}
					onChange={onChangeField}
					error={errorFieldId} />
			</Box>
		</DialogOptionRelation>
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
	formId: PropTypes.string,
};

export default Field;