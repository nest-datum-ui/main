import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { reducerUpdate as mainReducerUpdate } from '../../../main/actions/update.js';
import { storeDispatch } from '../../../Store.js';

export const fireFormEmpty = (storeFormName, structure) => async (callback = () => {}, prefix = 'api') => {
	if (utilsCheckStr(storeFormName)) {
		throw new Error(`Can't empty api store form. Property storeFormName "${storeFormName}" is not valid.`);
	}
	return callback(await storeDispatch(prefix, prefix +'.formEmpty', {
		payload: {
			storeFormName,
			structure,
		},
	}));
};

export const reducerFormEmpty = (state, action) => ({ 
	...mainReducerUpdate(state, action),
	form: {
		...state.form,
		[action.payload.storeFormName]: {
			...(action.payload.structure || {}),
		},
	}, 
});
