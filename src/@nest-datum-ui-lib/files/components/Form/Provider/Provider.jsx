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
	FILES_PATH_PROVIDER,
	FILES_PATH_PROVIDER_OPTION, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import {
	FILES_KEY_PROVIDER_RELATION,
	FILES_KEY_PROVIDER_VALUE,
} from '@nest-datum-ui-lib/files/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import FilesInputProviderStatus from '@nest-datum-ui-lib/files/components/Input/Provider/Status';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Provider = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_PROVIDER, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FILES_PATH_PROVIDER, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(FILES_PATH_PROVIDER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(FILES_PATH_PROVIDER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(FILES_PATH_PROVIDER_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FILES_PATH_PROVIDER, entityId)();
			actionApiListGet(FILES_PATH_PROVIDER_OPTION, {
				relations: {
					providerProviderOptions: {
						providerProviderProviderOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					providerProviderOptions: {
						providerId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(FILES_PATH_PROVIDER)();
		actionApiListClear(FILES_PATH_PROVIDER_OPTION)()
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
			<InputId storeFormName={FILES_PATH_PROVIDER} />
			<InputName storeFormName={FILES_PATH_PROVIDER} />
			<InputDescription storeFormName={FILES_PATH_PROVIDER} />
			<FilesInputProviderStatus storeFormName={FILES_PATH_PROVIDER} />
			<InputIsNotDelete storeFormName={FILES_PATH_PROVIDER} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={FILES_KEY_PROVIDER_RELATION}
					valueTableName={FILES_KEY_PROVIDER_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};
Provider.propTypes = {
};

export default Provider;
