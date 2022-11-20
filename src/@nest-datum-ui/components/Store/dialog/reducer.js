import main from '@nest-datum-ui/components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('dialog', actionsLocal);

export default reducer;
