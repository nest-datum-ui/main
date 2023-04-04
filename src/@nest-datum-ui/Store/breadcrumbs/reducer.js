import main from '../main/reducer.js';
import * as actions from './actions';

const reducer = () => main('breadcrumbs', actions);

export default reducer;
