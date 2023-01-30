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
	FORMS_PATH_FIELD,
	FORMS_PATH_FIELD_OPTION, 
} from '@nest-datum-ui-lib/forms/consts/path.js';
import {
	FORMS_KEY_FIELD_RELATION,
	FORMS_KEY_FIELD_VALUE,
} from '@nest-datum-ui-lib/forms/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import DataTypeInputType from '@nest-datum-ui-lib/data-type/components/Input/Type';
import FormsInputFieldStatus from '@nest-datum-ui-lib/forms/components/Input/Field/Status';
import InputIsRequired from '@nest-datum-ui/components/Input/IsRequired';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Field = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(FORMS_PATH_FIELD_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(FORMS_PATH_FIELD_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(FORMS_PATH_FIELD_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FORMS_PATH_FIELD, entityId)();
			actionApiListGet(FORMS_PATH_FIELD_OPTION, {
				relations: {
					fieldFieldOptions: {
						fieldFieldFieldOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					fieldFieldOptions: {
						fieldId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(FORMS_PATH_FIELD)();
		actionApiListClear(FORMS_PATH_FIELD_OPTION)()
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
			<InputId storeFormName={FORMS_PATH_FIELD} />
			<InputName storeFormName={FORMS_PATH_FIELD} />
			<InputDescription storeFormName={FORMS_PATH_FIELD} />
			<DataTypeInputType storeFormName={FORMS_PATH_FIELD} />
			<FormsInputFieldStatus storeFormName={FORMS_PATH_FIELD} />
			<InputIsRequired storeFormName={FORMS_PATH_FIELD} />
			<InputIsNotDelete storeFormName={FORMS_PATH_FIELD} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={FORMS_KEY_FIELD_RELATION}
					valueTableName={FORMS_KEY_FIELD_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
};

export default Field;
