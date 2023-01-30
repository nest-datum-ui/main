import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	FORMS_PATH_CONTENT,
	FORMS_PATH_FIELD_OPTION, 
} from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import FormsTableContentField from '@nest-datum-ui-lib/forms/components/Table/Content/Field';
import FormsDialogContentField from '@nest-datum-ui-lib/forms/components/Dialog/Content/Field';
import FormsDialogContentFieldDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Field/Drop';
import FormsInputContentStatus from '@nest-datum-ui-lib/forms/components/Input/Content/Status';
import FormsInputForm from '@nest-datum-ui-lib/forms/components/Input/Form';
import handlerSubmit from './handler/submit.js';

let Content = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_CONTENT, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_CONTENT ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_CONTENT, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_CONTENT, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FORMS_PATH_CONTENT, { entityId })(), [
		entityId,
	]);
	const onFieldAdd = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD_OPTION, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(FORMS_PATH_CONTENT, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(FORMS_PATH_CONTENT)(), [
	]);

	return <React.Fragment>
		<FormDefault 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={FORMS_PATH_CONTENT} />
			<FormsInputContentStatus storeFormName={FORMS_PATH_CONTENT} />
			<FormsInputForm storeFormName={FORMS_PATH_CONTENT} />
			<InputIsNotDelete storeFormName={FORMS_PATH_CONTENT} />
			{utilsCheckEntityExists(entityId)
				&& <FormsTableContentField 
					contentId={entityId}
					onAdd={onFieldAdd} />}
		</FormDefault>
		<FormsDialogContentField contentId={entityId} />
		<FormsDialogContentFieldDrop />
	</React.Fragment>;
};

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propTypes = {
};

export default Content;
