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
	FILES_PATH_SYSTEM,
	FILES_PATH_SYSTEM_OPTION, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import {
	FILES_KEY_SYSTEM_RELATION,
	FILES_KEY_SYSTEM_VALUE,
} from '@nest-datum-ui-lib/files/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import FilesInputProvider from '@nest-datum-ui-lib/files/components/Input/Provider';
import FilesInputSystemStatus from '@nest-datum-ui-lib/files/components/Input/System/Status';
import InputIsRequired from '@nest-datum-ui/components/Input/IsRequired';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let System = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FILES_PATH_SYSTEM, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(FILES_PATH_SYSTEM_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(FILES_PATH_SYSTEM_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(FILES_PATH_SYSTEM_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FILES_PATH_SYSTEM, entityId)();
			actionApiListGet(FILES_PATH_SYSTEM_OPTION, {
				relations: {
					systemSystemOptions: {
						systemSystemSystemOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					systemSystemOptions: {
						systemId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(FILES_PATH_SYSTEM)();
		actionApiListClear(FILES_PATH_SYSTEM_OPTION)()
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
			<InputId storeFormName={FILES_PATH_SYSTEM} />
			<InputName storeFormName={FILES_PATH_SYSTEM} />
			<InputDescription storeFormName={FILES_PATH_SYSTEM} />
			<FilesInputProvider storeFormName={FILES_PATH_SYSTEM} />
			<FilesInputSystemStatus storeFormName={FILES_PATH_SYSTEM} />
			<InputIsNotDelete storeFormName={FILES_PATH_SYSTEM} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={FILES_KEY_SYSTEM_RELATION}
					valueTableName={FILES_KEY_SYSTEM_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

System = React.memo(System);
System.defaultProps = {
};
System.propTypes = {
};

export default System;
