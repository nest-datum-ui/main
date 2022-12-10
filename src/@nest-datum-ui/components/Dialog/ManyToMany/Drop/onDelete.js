import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import Store from '@nest-datum-ui/components/Store';

const onDelete = async ({
	enqueueSnackbar,
	storeName,
	withAccessToken,
	url,
	path,
	relationId,
}) => {
	await actionApiFromDrop({
		storeName,
		withAccessToken,
		url,
		path,
		entityId: relationId,
		allowInsecureDeletion: true,
	})(enqueueSnackbar);
	await actionDialogClose(`${storeName}Drop`)();

	const data = [ ...((Store()
		.getState()['api']
		.list[storeName] || {})
		.data || []) ];
	const currentItemIndex = data.findIndex((item) => item['id'] === relationId);

	if (currentItemIndex > -1) {
		data.splice(currentItemIndex, 1);

		await actionApiListProp(storeName, 'data', [ ...data ])();
	}
};

export default onDelete;
