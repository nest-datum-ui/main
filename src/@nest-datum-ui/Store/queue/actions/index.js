import {
	strId as utilsCheckStrId,
	func as utilsCheckFunc,
	numericInt as utilsCheckNumericInt,
	objFilled as utilsCheckObjFilled,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import { getStore } from '../../Store.js';
import { fireListClear } from '../../api/actions/list/clear.js';
import { fireListGet } from '../../api/actions/list/get.js';

let _dropTimeouts = {},
	_loop = {};

setInterval(async () => {
	if (utilsCheckFunc(getStore)
		&& utilsCheckObjFilled(getStore())) {
		const listData = ((getStore()
			.getState()['api'] || {})
			.list || {});
		const loopMemo = { ..._loop };
		const max = Number(process.env.STORE_QUEUE_LOAD_COUNT || 4);
		let url,
			maxNow = 0;

		for (url in loopMemo) {
			const listDataSaved = (listData[`queue_${url}`] || {}).data || [];

			if (maxNow < max) {
				let i = 0,
					ids = [];

				while (i < loopMemo[url]['ids'].length) {
					const idNow = loopMemo[url]['ids'][i];

					if (!listDataSaved.find((item) => item.id === idNow)
						&& !ids.includes(idNow)) {
						if (!utilsCheckObj(_dropTimeouts[url])) {
							_dropTimeouts[url] = {};
						}
						if (!utilsCheckObj(_dropTimeouts[url][idNow])) {
							_dropTimeouts[url][idNow] = { flag: false, timeout: undefined };;
						}
						clearTimeout(_dropTimeouts[url][idNow]['timeout']);
						
						_dropTimeouts[url][idNow]['flag'] = false;
						ids.push(idNow);
					}
					i++;
				}
				if (ids.length > 0) {
					if (loopMemo[url]['callback']) {
						loopMemo[url]['callback']();
					}
					else {
						fireListGet(`queue_${url}`, {
							apiUrl: url,
							merge: true,
							filter: {
								id: [ '$In', ...ids ],
							},
						})();
					}
				}			
				maxNow++;
			}
			else {
				break;
			}
		}
	}
}, Number(process.env.STORE_QUEUE_INTERVAL || 1000));

export const fireSet = async (url, entityId, callback) => {
	if (!_loop[url]) {
		_loop[url] = { ids: [] };
	}
	if (utilsCheckFunc(callback)) {
		_loop[url]['callback'] = callback;
	}
	return _loop[url]['ids'].push(entityId);
};

export const fireClear = (url, entityId) => {
	if (!url && !entityId) {
		_loop = {};
		_dropTimeouts = {};
	}
	else {
		if (!_dropTimeouts[url]) {
			_dropTimeouts[url] = {};
		}
		if (utilsCheckStrId(entityId)) {
			if (!_dropTimeouts[url][entityId]) {
				_dropTimeouts[url][entityId] = { flag: false, timeout: undefined };
			}
			_dropTimeouts[url][entityId]['flag'] = true;
			_dropTimeouts[url][entityId]['timeout'] = setTimeout(() => {
				const entityIndex = _loop[url]['ids'].findIndex((id) => id === entityId);
				
				if (utilsCheckNumericInt(entityIndex)) {
					_loop[url]['ids'].splice(entityIndex, 1);
					fireListClear(`queue_${url}`)();
				}
			}, Number(process.env.STORE_QUEUE_CLEAR_TIMEOUT || 4000));

			return _dropTimeouts[url][entityId]['timeout'];
		}
		_dropTimeouts[url]['flag'] = true;
		_dropTimeouts[url]['timeout'] = setTimeout(() => {
			_loop[url] = { ids: [] };
			fireListClear(`queue_${url}`)();
		}, Number(process.env.STORE_QUEUE_CLEAR_TIMEOUT || 4000));

		return _dropTimeouts[url]['timeout'];
	}
};
