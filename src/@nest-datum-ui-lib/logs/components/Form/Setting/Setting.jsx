import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { LOGS_PATH_SETTING } from '@nest-datum-ui-lib/logs/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Form from '@nest-datum-ui/components/Form';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import DataTypeInputType from '@nest-datum-ui-lib/data-type/components/Input/Type';
import InputValue from '@nest-datum-ui/components/Input/Value';
import InputRegex from '@nest-datum-ui/components/Input/Regex';
import InputIsRequired from '@nest-datum-ui/components/Input/IsRequired';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Setting = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', LOGS_PATH_SETTING, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', LOGS_PATH_SETTING ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', LOGS_PATH_SETTING, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', LOGS_PATH_SETTING, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(LOGS_PATH_SETTING, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(LOGS_PATH_SETTING, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(LOGS_PATH_SETTING)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={LOGS_PATH_SETTING} />
			<InputName storeFormName={LOGS_PATH_SETTING} />
			<InputDescription storeFormName={LOGS_PATH_SETTING} />
			<DataTypeInputType storeFormName={LOGS_PATH_SETTING} />
			<InputValue storeFormName={LOGS_PATH_SETTING} />
			<InputRegex storeFormName={LOGS_PATH_SETTING} />
			<InputIsRequired storeFormName={LOGS_PATH_SETTING} />
			<InputIsNotDelete storeFormName={LOGS_PATH_SETTING} />
		</Form>
	</React.Fragment>;
};

Setting = React.memo(Setting);
Setting.defaultProps = {
};
Setting.propTypes = {
};

export default Setting;
