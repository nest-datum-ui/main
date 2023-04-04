import {
	strId as utilsCheckStrId,
	strUrl as utilsCheckStrUrl,
	numericInt as utilsCheckNumericInt,
	arrFilled as utilsCheckArrFilled,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import hookProperty from '../../../url/hooks/hookProperty.js';
import { getStore } from '../../../Store.js';
import { fireListGet } from '../list/get.js';
import { fireListProp } from '../list/prop.js';
import { fireListMerge } from '../list/merge.js';

export const fireFormDropOnList = ({ storeName, apiUrl, apiListUrl, entityId, ids = [], sliceInList = false, reloadImmediately = false }) => (prefix = 'api') => {
	if (!utilsCheckArrFilled(ids) && utilsCheckStrId(entityId)) {
		ids = [ entityId ];
	}
	if (utilsCheckStrUrl(storeName)) {
		throw new Error(`Can't drop api store form. Property storeName "${storeName}" is not valid.`);
	}
	const list = ((getStore().getState().api || {}).list || {})[storeName] || {};
	const listData = list.data || [];
	let i = 0,
		notIds = [];

	while (i < ids.length) {
		const entityId = ids[i];
		const entityIndex = listData.findIndex((item) => (item.id === entityId));

		if (utilsCheckObj(listData[entityIndex])) {
			if (!utilsCheckNumericInt(entityIndex)) {
				throw new Error(`Can't drop api store form. Entity with index "${entityIndex}" is not found.`);
			}
			if (reloadImmediately) {
				notIds.push(ids[i]);
			}
			else if (sliceInList) {
				listData.splice(entityIndex, 1);
			}
			else {
				if (listData[entityIndex].isDeleted) {
					notIds.push(entityId);
				}
				else {
					listData[entityIndex]['isDeleted'] = true;
				}
			}
			listData[entityIndex] = { ...listData[entityIndex] };
		}
		i++;
	}
	if (notIds.length > 0) {
		const query = hookProperty('query', window.location.search);
		const select = hookProperty('select', window.location.search);
		const filter = hookProperty('filter', window.location.search);
		const sort = hookProperty('sort', window.location.search);

		fireListGet(storeName, {
			apiUrl: apiListUrl ?? apiUrl,
			query,
			...select
				? { select: JSON.parse(decodeURI(select)) }
				: {},
			...sort
				? { sort: JSON.parse(decodeURI(sort)) }
				: {},
			filter: filter
				? {
					...JSON.parse(decodeURI(filter)),
					id: [ '$Not', '$In', ...notIds ],
				}
				: { 
					...(list.filter || {}),
					'id': [ '$Not', '$In', ...notIds ], 
				},
		})();
	}
	fireListMerge(storeName, {
		data: [ ...listData ],
		selected: [],
		selectedForDrop: [],
		selectedForDropPermanently: [],
	})();
	if (!(notIds.length > 0)) {
		setTimeout(() => fireListProp(storeName, 'loader', false)(), 0);
	}
};
