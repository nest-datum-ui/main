import { reducerSchema as schema } from './schema.js';
import { reducerListPurge as listPurge } from './list/purge.js';
import { reducerListClear as listClear } from './list/clear.js';
import { reducerListGet as listGet } from './list/get.js';
import { reducerListProp as listProp } from './list/prop.js';
import { reducerListPush as listPush } from './list/push.js';
import { reducerListSlice as listSlice } from './list/slice.js';
import { reducerListSplice as listSplice } from './list/splice.js';
import { reducerListMerge as listMerge } from './list/merge.js';
import { reducerFormClear as formClear } from './form/clear.js';
import { reducerFormMerge as formMerge } from './form/merge.js';
import { reducerFormCreate as formCreate } from './form/create.js';
import { reducerFormDrop as formDrop } from './form/drop.js';
import { reducerFormEmpty as formEmpty } from './form/empty.js';
import { reducerFormGet as formGet } from './form/get.js';
import { reducerFormProp as formProp } from './form/prop.js';
import { reducerFormPurge as formPurge } from './form/purge.js';

export {
	schema,
	listPurge,
	listClear,
	listGet,
	listProp,
	listPush,
	listSlice,
	listSplice,
	listMerge,
	formClear,
	formMerge,
	formCreate,
	formDrop,
	formEmpty,
	formGet,
	formProp,
	formPurge,
};
