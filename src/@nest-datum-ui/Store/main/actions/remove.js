import { storeDispatch } from '../../Store.js';

export const fireRemove = () => async (prefix = 'main') => storeDispatch(prefix, prefix +'.remove');

export const reducerRemove = (state, action) => undefined;
