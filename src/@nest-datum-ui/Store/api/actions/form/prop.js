import { objMergeRec as urilsFormatObjMergeRec } from '@nest-datum-utils/format';
import {
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireFormProp = (storeFormName, propName, propValue, path) => async (callback = () => {}, prefix = 'api') => await callback(await storeDispatch(prefix, prefix +'.formProp', {
		payload: {
			storeFormName,
			propName, 
			propValue,
			path,
		},
	}));

export const reducerFormProp = (state, action) => {
	if (utilsCheckStr(action.payload.storeFormName)) {
		if (!utilsCheckObj(state.form[action.payload.storeFormName])) {
			state.form[action.payload.storeFormName] = {};
		}
		if (utilsCheckArr(action.payload.path)) {
			state.form = urilsFormatObjMergeRec(state.form, action.payload);
		}
		else {
			state.form[action.payload.storeFormName][action.payload.propName] = action.payload.propValue;
		}
		state.form[action.payload.storeFormName] = { ...state.form[action.payload.storeFormName] };
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
