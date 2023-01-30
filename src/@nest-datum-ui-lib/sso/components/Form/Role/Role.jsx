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
	SSO_PATH_ROLE,
	SSO_PATH_ROLE_OPTION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import {
	SSO_KEY_ROLE_RELATION,
	SSO_KEY_ROLE_VALUE,
} from '@nest-datum-ui-lib/sso/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import SsoInputRoleStatus from '@nest-datum-ui-lib/sso/components/Input/Role/Status';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Role = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ROLE_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ROLE_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(SSO_PATH_ROLE, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(SSO_PATH_ROLE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(SSO_PATH_ROLE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(SSO_PATH_ROLE_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(SSO_PATH_ROLE, entityId)();
			actionApiListGet(SSO_PATH_ROLE_OPTION, {
				relations: {
					roleRoleOptions: {
						roleRoleRoleOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					roleRoleOptions: {
						roleId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(SSO_PATH_ROLE)();
		actionApiListClear(SSO_PATH_ROLE_OPTION)()
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
			<InputId storeFormName={SSO_PATH_ROLE} />
			<InputName storeFormName={SSO_PATH_ROLE} />
			<InputDescription storeFormName={SSO_PATH_ROLE} />
			<SsoInputRoleStatus storeFormName={SSO_PATH_ROLE} />
			<InputIsNotDelete storeFormName={SSO_PATH_ROLE} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={SSO_KEY_ROLE_RELATION}
					valueTableName={SSO_KEY_ROLE_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Role = React.memo(Role);
Role.defaultProps = {
};
Role.propTypes = {
};

export default Role;
