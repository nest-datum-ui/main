import main from '../main/reducer.js';
import * as actions from './actions';

const reducer = () => main('api', { ...actions });

export default reducer;
