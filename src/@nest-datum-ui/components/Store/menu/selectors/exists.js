import { createSelector } from 'reselect';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['menu'],
	(state) => utilsCheckObj(state),
);

export default exists;
