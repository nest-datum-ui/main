import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	FORMS_PATH_FIELD_OPTION,
	FORMS_PATH_FIELD, 
} from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Box from '@mui/material/Box';
import FormsTableFieldOptionRelation from '@nest-datum-ui-lib/forms/components/Table/Field/Option/Relation';
import FormsDialogFieldOptionRelation from '@nest-datum-ui-lib/forms/components/Dialog/Field/Option/Relation';
import FormsDialogFieldOptionRelationDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Option/Relation/Drop';
import TypographyTitle from '@nest-datum-ui/components/Typography/Title';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';
import Form from '@nest-datum-ui/components/Form';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import DataTypeInputType from '@nest-datum-ui-lib/data-type/components/Input/Type';
import InputDefaultValue from '@nest-datum-ui/components/Input/DefaultValue';
import InputRegex from '@nest-datum-ui/components/Input/Regex';
import InputIsRequired from '@nest-datum-ui/components/Input/IsRequired';
import InputIsMultiline from '@nest-datum-ui/components/Input/IsMultiline';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Option = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD_OPTION, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(FORMS_PATH_FIELD_OPTION, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(FORMS_PATH_FIELD_OPTION)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputName storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputDescription storeFormName={FORMS_PATH_FIELD_OPTION} />
			<DataTypeInputType storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputDefaultValue storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputRegex storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputIsRequired storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputIsMultiline storeFormName={FORMS_PATH_FIELD_OPTION} />
			<InputIsNotDelete storeFormName={FORMS_PATH_FIELD_OPTION} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<TypographyTitle>
						Fields
					</TypographyTitle>
					<TypographyCaption>
						List of fields that will own the current option.
					</TypographyCaption>
					<Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onRelationAdd}>
							Add new relation
						</ButtonCreate>
					</Box>
					<FormsTableFieldOptionRelation fieldOptionId={entityId} />
				</React.Fragment>}
		</Form>
		<FormsDialogFieldOptionRelation optionId={entityId} />
		<FormsDialogFieldOptionRelationDrop />
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
