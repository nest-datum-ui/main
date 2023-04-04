import main from '../main/reducer.js';
import * as actions from './actions';

const reducer = () => main('loader', actions);

export default reducer;
