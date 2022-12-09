import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import Store from '@nest-datum-ui/components/Store';

const onDelete = async ({
	enqueueSnackbar,
	listStoreName,
	id,
	optionId,
	formId,
}) => {
	await actionApiFromDrop({
		storeName: listStoreName,
		entityId: optionId,
		withAccessToken: true,
		allowInsecureDeletion: true,
		url: process.env.SERVICE_FORMS,
		path: `form/${formId}/options`,
	})(enqueueSnackbar);
	await actionDialogClose(id)();

	const listStoreNameData = [ ...((Store()
		.getState()['api']
		.list[listStoreName] || {})
		.data || []) ];
	const currentItemIndex = listStoreNameData.findIndex((item) => {
		return ({ ...item['formFormOptions'][0] })['id'] === formId;
	});

	if (currentItemIndex > -1) {
		listStoreNameData.splice(currentItemIndex, 1);

		await actionApiListProp(listStoreName, 'data', [ ...listStoreNameData ])();
	}
};

export default onDelete;
