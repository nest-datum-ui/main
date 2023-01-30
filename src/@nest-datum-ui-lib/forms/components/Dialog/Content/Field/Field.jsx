import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	FORMS_PATH_FIELD_OPTION,
	FORMS_PATH_FIELD,
	FORMS_PATH_CONTENT_FIELD, 
	FORMS_PATH_CONTENT,
} from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import MixedValue from '@nest-datum-ui/components/Form/MixedValue';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import FormsSelectField from '@nest-datum-ui-lib/forms/components/Select/Field';

let Field = ({ contentId }) => {
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_CONTENT_FIELD, 'loader' ]));
	const fieldId = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'fieldId' ])) ?? '';
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'data' ], (state) => (((state || []).find((item) => item.id === fieldId)) || {}).dataTypeId)) ?? '';
	const value = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'value' ])) ?? '';
	const errorFieldId = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'errors', 'fieldId' ]));
	const errorValue = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'errors', 'value' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(FORMS_PATH_FIELD_OPTION, e)({
		entityId: contentId,
		storeListName: FORMS_PATH_CONTENT_FIELD,
		path: `${FORMS_PATH_CONTENT}/${contentId}/field`,
		columnName: 'formId',
	}), [
		contentId,
	]);
	const onChangeField = React.useCallback((e) => actionApiFormProp(FORMS_PATH_FIELD_OPTION, 'fieldId', e.target.value)(), [
	]);
	const onChangeValue = React.useCallback((e) => actionApiFormProp(FORMS_PATH_FIELD_OPTION, 'value', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(FORMS_PATH_FIELD_OPTION)();
		actionApiFormClear(FORMS_PATH_FIELD_OPTION)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={FORMS_PATH_FIELD_OPTION}
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
			{dataTypeId 
				&& <Box py={2}>
					<MixedValue 
						loader={formLoader === true || listLoader === true}
						stateNameForm={FORMS_PATH_FIELD_OPTION}
						name="value"
						label="Value"
						dataTypeId={dataTypeId}
						value={value}
						onChange={onChangeValue}
						error={errorValue} />
				</Box>}
		</DialogOptionRelation>
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
	contentId: PropTypes.string,
};

export default Field;