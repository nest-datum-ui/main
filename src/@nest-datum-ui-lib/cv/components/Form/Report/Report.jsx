import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { CV_PATH_REPORT } from '@nest-datum-ui-lib/cv/consts/path.js';
import { FORMS_PATH_FIELD_OPTION } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Form from '@nest-datum-ui/components/Form';
import FormsTableContentField from '@nest-datum-ui-lib/forms/components/Table/Content/Field';
import FormsDialogContentField from '@nest-datum-ui-lib/forms/components/Dialog/Content/Field';
import FormsDialogContentFieldDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Field/Drop';
import InputId from '@nest-datum-ui/components/Input/Id';
import FilesInputFile from '@nest-datum-ui-lib/files/components/Input/File';
import CvInputReportStatus from '@nest-datum-ui-lib/cv/components/Input/Report/Status';
import handlerSubmit from './handler/submit.js';

let Report = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', CV_PATH_REPORT, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', CV_PATH_REPORT ], (formObj) => Object.keys(formObj || {}).length));
	const contentId = useSelector(selectorMainExtract([ 'api', 'form', CV_PATH_REPORT, 'contentId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', CV_PATH_REPORT, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', CV_PATH_REPORT, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(CV_PATH_REPORT, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(FORMS_PATH_FIELD_OPTION, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(CV_PATH_REPORT, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(CV_PATH_REPORT)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={CV_PATH_REPORT} />
			<FilesInputFile storeFormName={CV_PATH_REPORT} />
			<CvInputReportStatus storeFormName={CV_PATH_REPORT} />
			{utilsCheckEntityExists(entityId)
				&& <FormsTableContentField 
					contentId={contentId}
					onAdd={onRelationAdd} />}
		</Form>
		<FormsDialogContentField contentId={contentId} />
		<FormsDialogContentFieldDrop />
	</React.Fragment>;
};

Report = React.memo(Report);
Report.defaultProps = {
};
Report.propTypes = {
};

export default Report;
