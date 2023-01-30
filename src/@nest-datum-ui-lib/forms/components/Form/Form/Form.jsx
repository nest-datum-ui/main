import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormCreateOption as actionApiFormCreateOption } from '@nest-datum-ui/components/Store/api/actions/form/createOption.js';
import { fireFormUpdateOption as actionApiFormUpdateOption } from '@nest-datum-ui/components/Store/api/actions/form/updateOption.js';
import { fireFormDropOption as actionApiFormDropOption } from '@nest-datum-ui/components/Store/api/actions/form/dropOption.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	FORMS_PATH_FORM,
	FORMS_PATH_FORM_OPTION, 
	FORMS_PATH_FIELD,
} from '@nest-datum-ui-lib/forms/consts/path.js';
import {
	FORMS_KEY_FORM_RELATION,
	FORMS_KEY_FORM_VALUE,
} from '@nest-datum-ui-lib/forms/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import FormsTableFormField from '@nest-datum-ui-lib/forms/components/Table/Form/Field';
import FormsDialogFormField from '@nest-datum-ui-lib/forms/components/Dialog/Form/Field';
import FormsDialogFormFieldDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Field/Drop';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import FormsInputFormStatus from '@nest-datum-ui-lib/forms/components/Input/Form/Status';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Form = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FORM, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FORM ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FORM, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FORM, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FORM, { entityId })(), [
		entityId,
	]);
	const onFieldAdd = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(FORMS_PATH_FORM_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(FORMS_PATH_FORM_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(FORMS_PATH_FORM_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FORMS_PATH_FORM, entityId)();
			actionApiListGet(FORMS_PATH_FORM_OPTION, {
				relations: {
					formFormOptions: {
						formFormFormOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					formFormOptions: {
						formId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(FORMS_PATH_FORM)();
		actionApiListClear(FORMS_PATH_FORM_OPTION)()
	}, [
	]);

	return <React.Fragment>
		<FormDefault 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loaderForm || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={FORMS_PATH_FORM} />
			<InputName storeFormName={FORMS_PATH_FORM} />
			<InputDescription storeFormName={FORMS_PATH_FORM} />
			<FormsInputFormStatus storeFormName={FORMS_PATH_FORM} />
			<InputIsNotDelete storeFormName={FORMS_PATH_FORM} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<ListOption 
						title="Options:"
						entityId={entityId}
						loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
						onChange={onOptionChange}
						onAdd={onOptionAdd}
						onDrop={onOptionDrop}
						relationTableName={FORMS_KEY_FORM_RELATION}
						valueTableName={FORMS_KEY_FORM_VALUE}>
						{dataOption}
					</ListOption>
					<FormsTableFormField 
						formId={entityId}
						onAdd={onFieldAdd} />
				</React.Fragment>}
		</FormDefault>
		<FormsDialogFormField formId={entityId} />
		<FormsDialogFormFieldDrop />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
