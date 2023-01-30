import Store from '@nest-datum-ui/components/Store';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireListGet as actionApiListGet } from '../list/get.js';
import { fireFormProp as actionApiFormProp } from './prop.js';

export const fireFormDropOnList = (storeFormName, entityId, sliceInList = false) => (prefix = 'api') => {
	if (utilsCheckStrUrl(storeFormName)) {
		if (!utilsCheckStrId(entityId)) {
			return false;
		}
		const list = ((Store()
			.getState()
			.api || {})
			.list || {})[storeFormName] || {};
		const listData = list.data || [];
		const entityIndex = listData.findIndex((item) => (item.id === entityId));

		if (entityIndex >= 0 && utilsCheckObj(listData[entityIndex])) {
			if (sliceInList) {
				listData.splice(entityIndex, 1);

				actionApiListProp(storeFormName, 'data', [ ...listData ])();
				actionApiListProp(storeFormName, 'loader', false)();
				actionApiFormProp(storeFormName, 'loader', false)();
			}
			else {
				if (listData[entityIndex].isDeleted) {
					const query = utilsUrlSearchPathItem('query', window.location.search);
					const select = utilsUrlSearchPathItem('select', window.location.search);
					const filter = utilsUrlSearchPathItem('filter', window.location.search);
					const sort = utilsUrlSearchPathItem('sort', window.location.search);

					actionApiListGet(storeFormName, {
						query,
						...select
							? { select: JSON.parse(decodeURI(select)) }
							: {},
						...filter
							? { 
								filter: {
									...JSON.parse(decodeURI(filter)),
									id: [ '$Not', entityId ],
								},
							}
							: {
								filter: {
									'id': [ '$Not', entityId ],
								},
							},
						...sort
							? { sort: JSON.parse(decodeURI(sort)) }
							: {},
					})();
				}
				else {
					actionApiListProp(storeFormName, 'data', true, [ entityIndex, 'isDeleted' ])();
					actionApiListProp(storeFormName, 'loader', false)();
					actionApiFormProp(storeFormName, 'loader', false)();
				}
			}
		}
	}
};
