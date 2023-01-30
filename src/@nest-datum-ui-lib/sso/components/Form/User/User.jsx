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
	SSO_PATH_USER,
	SSO_PATH_USER_OPTION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import {
	SSO_KEY_USER_RELATION,
	SSO_KEY_USER_VALUE,
} from '@nest-datum-ui-lib/sso/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import InputPassword from '@nest-datum-ui/components/Input/Password';
import SsoInputUserStatus from '@nest-datum-ui-lib/sso/components/Input/User/Status';
import SsoInputUserVerifyKey from '@nest-datum-ui-lib/sso/components/Input/User/Verify/Key';
import SsoInputUserVerifyAt from '@nest-datum-ui-lib/sso/components/Input/User/Verify/At';
import SsoInputUserLogin from '@nest-datum-ui-lib/sso/components/Input/User/Login';
import SsoInputRole from '@nest-datum-ui-lib/sso/components/Input/Role';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';
import handlerMount from './handler/mount.js';

let User = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_USER, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER_OPTION, 'loader' ]));
	const readyOption = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER_OPTION, 'ready' ]));
	const loaderList = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_USER ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_USER, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_USER, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(SSO_PATH_USER, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(SSO_PATH_USER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(SSO_PATH_USER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(SSO_PATH_USER_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(SSO_PATH_USER, entityId)();
			actionApiListGet(SSO_PATH_USER, {
				filter: {
					userUserOptions: {
						userId: entityId,
					},
				},
			})();
			actionApiListGet(SSO_PATH_USER_OPTION, {
				filter: {
					isDeleted: false,
				},
			})();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => {
		if (loaderOption === false && loaderList === false) {
			handlerMount();
		}
	}, [
		loaderOption,
		loaderList,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(SSO_PATH_USER)();
		actionApiListClear(SSO_PATH_USER_OPTION)()
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
			<InputId storeFormName={SSO_PATH_USER} />
			<SsoInputUserLogin storeFormName={SSO_PATH_USER} />
			<InputEmail storeFormName={SSO_PATH_USER} />
			<InputPassword storeFormName={SSO_PATH_USER} />
			<SsoInputUserVerifyKey storeFormName={SSO_PATH_USER} />
			<SsoInputUserVerifyAt storeFormName={SSO_PATH_USER} />
			<SsoInputRole storeFormName={SSO_PATH_USER} />
			<SsoInputUserStatus storeFormName={SSO_PATH_USER} />
			<InputIsNotDelete storeFormName={SSO_PATH_USER} />
			{(utilsCheckEntityExists(entityId) && readyOption)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={SSO_KEY_USER_RELATION}
					valueTableName={SSO_KEY_USER_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

User = React.memo(User);
User.defaultProps = {
};
User.propTypes = {
};

export default User;
