import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import Store from '@nest-datum-ui/components/Store';

const onDelete = async ({
	enqueueSnackbar,
	listStoreName,
	id,
	optionId,
	templateId,
}) => {
	await actionApiFromDrop({
		storeName: listStoreName,
		entityId: optionId,
		withAccessToken: true,
		allowInsecureDeletion: true,
		url: process.env.SERVICE_MAIL,
		path: `template/${templateId}/options`,
	})(enqueueSnackbar);
	await actionDialogClose(id)();

	const listStoreNameData = [ ...((Store()
		.getState()['api']
		.list[listStoreName] || {})
		.data || []) ];
	const currentItemIndex = listStoreNameData.findIndex((item) => {
		return ({ ...item['templateTemplateOptions'][0] })['id'] === templateId;
	});

	if (currentItemIndex > -1) {
		listStoreNameData.splice(currentItemIndex, 1);

		await actionApiListProp(listStoreName, 'data', [ ...listStoreNameData ])();
	}
};

export default onDelete;
