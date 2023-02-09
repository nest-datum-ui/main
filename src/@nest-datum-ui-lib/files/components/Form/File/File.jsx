import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { FILES_PATH_FILE } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Store from '@nest-datum-ui/components/Store';
import FormDefault from '@nest-datum-ui/components/Form';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let File = ({ 
	entityId,
	systemId,
	loader, 
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'loader' ]));
	const path = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE, 'path' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_FILE ], (formObj) => Object.keys(formObj || {}).length));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const ready = loader 
		|| loaderForm 
		|| (utilsCheckEntityExists(entityId) && formLength < 6);
	
	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FILES_PATH_FILE, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => {
		if (systemId) {
			const breadcrumbsData = ((Store()
				.getState()
				.breadcrumbs
				.list['filesManageList'] || {})
				.data || []);
			const defaultPath = (breadcrumbsData[breadcrumbsData.length - 1] || {}).path;

			if (path || defaultPath) {
				actionApiFormProp(FILES_PATH_FILE, 'path', path || defaultPath)();
				actionApiFormProp(FILES_PATH_FILE, 'systemId', systemId)();
			}
		}
	}, [
		ready,
		path,
		systemId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(FILES_PATH_FILE)();
	}, [
	]);

	return <React.Fragment>
		<FormDefault 
			onSubmit={onSubmit}
			loader={ready}>
			<InputName storeFormName={FILES_PATH_FILE} />
			<InputDescription storeFormName={FILES_PATH_FILE} />
			<InputIsNotDelete storeFormName={FILES_PATH_FILE} />
		</FormDefault>
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
};
File.propTypes = {
	loader: PropTypes.bool,
	entityId: PropTypes.string,
	systemId: PropTypes.string,
};

export default File;
