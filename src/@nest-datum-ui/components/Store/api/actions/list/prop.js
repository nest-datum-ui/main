import Store from '@nest-datum-ui/components/Store';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import propRecursiveSet from '../propRecursiveSet.js';

export const fireListProp = (storeListName, propName, propValue, path) => (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.listProp',
		payload: {
			storeListName,
			propName, 
			propValue,
			path,
		},
	});
};

export const reducerListProp = (state, action) => {
	if (!utilsCheckObj(state.list[action.payload.storeListName])) {
		state.list[action.payload.storeListName] = {};
	}
	if (utilsCheckStr(action.payload.storeListName)) {
		if (utilsCheckArr(action.payload.path)) {
			state.list = propRecursiveSet(state.list, action.payload);
		}
		else {
			state.list[action.payload.storeListName][action.payload.propName] = action.payload.propValue;
		}
		state.list[action.payload.storeListName] = { ...state.list[action.payload.storeListName] };
	}
	return { 
		...state,
		list: {
			...state.list,
		}, 
	};
};
