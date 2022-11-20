import main from '@nest-datum-ui/components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('menu', actionsLocal);

export default reducer;
