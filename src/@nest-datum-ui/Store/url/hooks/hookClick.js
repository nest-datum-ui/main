import { hookUrlNavigate } from '@nest-datum-ui/Store';

const hookClick = (...props) => () => hookUrlNavigate(...props);

export default hookClick;
