import { createAppContext } from '@nest-datum-ui/Context';
import sso from '@nest-datum-ui-admin-lib/sso/src/config';
import dataType from '@nest-datum-ui-admin-lib/data-type/src/config';

const importSchema = {
	'data-type': createAppContext(dataType),
	'sso': createAppContext(sso),
};

export default importSchema;
