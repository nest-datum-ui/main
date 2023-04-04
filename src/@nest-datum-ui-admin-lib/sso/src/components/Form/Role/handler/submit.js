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
	strDescription as utilsCheckStrDescription,
	strEnvKey as utilsCheckStrEnvKey,
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
		name: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrName ],
			isRequired: true,
		},
		envKey: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrEnvKey ],
		},
		description: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrDescription ]
		},
		roleStatusId: {
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
