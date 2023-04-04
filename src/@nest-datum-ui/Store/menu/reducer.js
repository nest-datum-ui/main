import main from '../main/reducer.js';
import * as actions from './actions';

const reducer = () => main('menu', actions);

export default reducer;
