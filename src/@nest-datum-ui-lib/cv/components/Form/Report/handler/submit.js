import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { CV_PATH_REPORT } from '@nest-datum-ui-lib/cv/consts/path.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(CV_PATH_REPORT, 'loader', true)();

	const {
		id,
		fileId,
		reportStatusId,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[CV_PATH_REPORT] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrId(fileId)
		&& (errors['fileId'] = 'The value is in the wrong format.');
	(reportStatusId && !utilsCheckStrId(reportStatusId))
		&& (errors['reportStatusId'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(CV_PATH_REPORT, 'errors', errors)();
		await actionApiFormProp(CV_PATH_REPORT, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(CV_PATH_REPORT, entityId)();
	}
	else {
		actionApiFormCreate(CV_PATH_REPORT)();
	}
};

export default submit;
