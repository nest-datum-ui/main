import{
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { objMergeRec as urilsFormatObjMergeRec } from '@nest-datum-utils/format';
import { storeDispatch } from '../../../Store.js';

export const fireListProp = (storeName, propName, propValue) => async (callback = () => {}, prefix = 'api') => await storeDispatch(prefix, prefix +'.listProp', {
	payload: {
		storeName,
		propName, 
		propValue,
		callback,
	},
})

export const reducerListProp = (state, action) => {
	if (!utilsCheckObj(state.list[action.payload.storeName])) {
		state.list[action.payload.storeName] = {};
	}
	if (utilsCheckStr(action.payload.storeName)) {
		if (utilsCheckArrFilled(action.payload.propName)) {
			state.list = urilsFormatObjMergeRec(state.list, action.payload);
		}
		else {
			state.list[action.payload.storeName][action.payload.propName] = action.payload.propValue;
		}
		state.list[action.payload.storeName] = { ...state.list[action.payload.storeName] };
		state.list[action.payload.storeName]['data'] = [ ...(state.list[action.payload.storeName]['data'] || []) ];
	}
	setTimeout(() => action.payload.callback(action, state), 0);

	return { 
		...state,
		list: {
			...state.list,
		}, 
	};
};
