import main from '../main/reducer.js';
import * as actions from './actions';

const reducer = () => main('dialog', actions);

export default reducer;
