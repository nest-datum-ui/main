import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormCreate,
	actionApiFormUpdate, 
	actionApiFormCreateOptions,
} from '@nest-datum-ui/Store';
import {
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	strName as utilsCheckStrName,
	strEmail as utilsCheckStrEmail,
	strPassword as utilsCheckStrPassword,
	strDate as utilsCheckStrDate,
	strFilled as utilsCheckStrFilled,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';

const submit = async (e, { 
	storeName, 
	optionListStoreName, 
	optionRelationListEntity, 
	optionRelationListEntityOptionRelation, 
	apiUrl, 
	optionRelationListApiUrl, 
	entityId, 
}) => {
	const validatedData = await utilsValidateStore(storeName, {
		id: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
		},
		login: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrName ],
			isRequired: true,
		},
		email: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrEmail ],
			isRequired: true,
		},
		password: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrPassword ],
		},
		emailVerifyKey: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrFilled ],
		},
		emailVerifyAt: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrDate ],
		},
		roleId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
			isRequired: true,
		},
		userStatusId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
			isRequired: true,
		},
		isNotDelete: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckBool ]
		},
	});

	if (validatedData) {
		if (utilsCheckStrIdExists(entityId)) {
			actionApiFormUpdate(storeName, { apiUrl, entityId })();
			actionApiFormCreateOptions(optionListStoreName, { 
				entityId,
				formStoreName: storeName,
				apiUrl: optionRelationListApiUrl.replace(':id', entityId), 
				entity: optionRelationListEntity,
				entityOptionRelation: optionRelationListEntityOptionRelation,
			})();
		}
		else {
			actionApiFormCreate(storeName, { apiUrl, redirect: true })();
		}
	}
};

export default submit;
