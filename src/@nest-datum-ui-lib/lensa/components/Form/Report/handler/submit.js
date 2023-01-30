import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { LENSA_PATH_REPORT } from '@nest-datum-ui-lib/lensa/consts/path.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(LENSA_PATH_REPORT, 'loader', true)();

	const {
		id,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[LENSA_PATH_REPORT] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(LENSA_PATH_REPORT, 'errors', errors)();
		await actionApiFormProp(LENSA_PATH_REPORT, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(LENSA_PATH_REPORT, entityId)();
	}
	else {
		actionApiFormCreate(LENSA_PATH_REPORT)();
	}
};

export default submit;
