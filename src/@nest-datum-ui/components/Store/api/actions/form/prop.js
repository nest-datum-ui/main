import Store from '@nest-datum-ui/components/Store';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import propRecursiveSet from '../propRecursiveSet.js';

export const fireFormProp = (storeFormName, propName, propValue, path) => (callback = () => {}, prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formProp',
		payload: {
			storeFormName,
			propName, 
			propValue,
			path,
		},
	});
	callback(Store().getState().api || {});
};

export const reducerFormProp = (state, action) => {
	if (utilsCheckStr(action.payload.storeFormName)) {
		if (!utilsCheckObj(state.form[action.payload.storeFormName])) {
			state.form[action.payload.storeFormName] = {};
		}
		if (utilsCheckArr(action.payload.path)) {
			state.form = propRecursiveSet(state.form, action.payload);
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
