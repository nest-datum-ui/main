import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireSchema = (payload) => async (prefix = 'dialog') => {
	Store().dispatch({
		type: prefix +'.schema',
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerSchema = (state, action) => {
	return ({
        _updater: 0,
    });
};
