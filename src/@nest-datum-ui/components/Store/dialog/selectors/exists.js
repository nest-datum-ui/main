import { createSelector } from 'reselect';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['dialog'],
	(state) => utilsCheckObj(state['dialog']),
);

export default exists;
