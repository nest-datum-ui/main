import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { SSO_PATH_ROLE_STATUS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Form from '@nest-datum-ui/components/Form';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Status = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE_STATUS, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE_STATUS ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE_STATUS, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE_STATUS, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(SSO_PATH_ROLE_STATUS, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(SSO_PATH_ROLE_STATUS, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(SSO_PATH_ROLE_STATUS)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={SSO_PATH_ROLE_STATUS} />
			<InputName storeFormName={SSO_PATH_ROLE_STATUS} />
			<InputDescription storeFormName={SSO_PATH_ROLE_STATUS} />
			<InputIsNotDelete storeFormName={SSO_PATH_ROLE_STATUS} />
		</Form>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;
