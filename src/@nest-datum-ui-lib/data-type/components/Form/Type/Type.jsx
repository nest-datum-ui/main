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
	DATA_TYPE_PATH_TYPE,
	DATA_TYPE_PATH_TYPE_OPTION, 
} from '@nest-datum-ui-lib/data-type/consts/path.js';
import {
	DATA_TYPE_KEY_TYPE_RELATION,
	DATA_TYPE_KEY_TYPE_VALUE,
} from '@nest-datum-ui-lib/data-type/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import DataTypeInputType from '@nest-datum-ui-lib/data-type/components/Input/Type';
import DataTypeInputTypeStatus from '@nest-datum-ui-lib/data-type/components/Input/Type/Status';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Type = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(DATA_TYPE_PATH_TYPE, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(DATA_TYPE_PATH_TYPE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(DATA_TYPE_PATH_TYPE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(DATA_TYPE_PATH_TYPE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const inputDataTypeParentFilter = React.useCallback(() => ({ id: [ '$Not', entityId ] }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(DATA_TYPE_PATH_TYPE, entityId)();
			actionApiListGet(DATA_TYPE_PATH_TYPE_OPTION, {
				relations: {
					typeTypeOptions: {
						typeTypeTypeOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					typeTypeOptions: {
						typeId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(DATA_TYPE_PATH_TYPE)();
		actionApiListClear(DATA_TYPE_PATH_TYPE_OPTION)()
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
			<InputId storeFormName={DATA_TYPE_PATH_TYPE} />
			<InputName storeFormName={DATA_TYPE_PATH_TYPE} />
			<InputDescription storeFormName={DATA_TYPE_PATH_TYPE} />
			<DataTypeInputType 
				storeFormName={DATA_TYPE_PATH_TYPE}
				filter={inputDataTypeParentFilter}
				label="Parent type"
				name="parentId" />
			<DataTypeInputTypeStatus storeFormName={DATA_TYPE_PATH_TYPE} />
			<InputIsNotDelete storeFormName={DATA_TYPE_PATH_TYPE} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={DATA_TYPE_KEY_TYPE_RELATION}
					valueTableName={DATA_TYPE_KEY_TYPE_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Type = React.memo(Type);
Type.defaultProps = {
};
Type.propTypes = {
};

export default Type;
