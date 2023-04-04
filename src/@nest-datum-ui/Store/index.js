import { getStore } from './Store.js';
import Provider from './Provider.jsx';

import { 
	get as getSnackbarHook,
	set as setSnackbarHook,
	hookSnackbar, 
} from './snackbar/hooks';
import {
	get as getUrlHook,
	set as setUrlHook,
	hookNavigate as hookUrlNavigate,
	hookLocation as hookUrlLocation,
} from './url/hooks';
import hookUrlFilterBoolItem from './url/hooks/hookFilterBoolItem.js';
import hookUrlFilterItem from './url/hooks/hookFilterItem.js';
import hookUrlLastPathItem from './url/hooks/hookLastPathItem.js';
import hookUrlPrevPathItem from './url/hooks/hookPrevPathItem.js';
import hookUrlProperty from './url/hooks/hookProperty.js';
import hookUrlServiceKey from './url/hooks/hookServiceKey.js';
import hookUrlPathname from './url/hooks/hookPathname.js';
import hookUrlClick from './url/hooks/hookClick.js';

import selectorMainArrayFind from './main/selectors/arrayFind.js';
import selectorMainArrayFindByKeyValue from './main/selectors/arrayFindByKeyValue.js';
import selectorMainArrayIncludes from './main/selectors/arrayIncludes.js';
import selectorMainArrayIsArray from './main/selectors/arrayIsArray.js';
import selectorMainExists from './main/selectors/exists.js';
import selectorMainExtract from './main/selectors/extract.js';
import selectorDialogVisible from './dialog/selectors/visible.js';
import selectorLoaderVisible from './loader/selectors/visible.js';
import selectorLoaderProgressPercentage from './loader/selectors/progressPercentage.js';
import selectorLoaderText from './loader/selectors/text.js';
import selectorMenuNode from './menu/selectors/node.js';
import selectorUrlFindFilterItem from './url/selectors/findFilterItem.js';

import { fireSchema as actionApiSchema } from './api/actions/schema.js';
import { fireListPurge as actionApiListPurge } from './api/actions/list/purge.js';
import { fireListBulk as actionApiListBulk } from './api/actions/list/bulk.js';
import { fireListBulkDrop as actionApiListBulkDrop } from './api/actions/list/bulkDrop.js';
import { fireListCheck as actionApiListCheck } from './api/actions/list/check.js';
import { fireListDrop as actionApiListDrop } from './api/actions/list/drop.js';
import { fireListLimit as actionApiListLimit } from './api/actions/list/limit.js';
import { fireListPage as actionApiListPage } from './api/actions/list/page.js';
import { fireListRestore as actionApiListRestore } from './api/actions/list/restore.js';
import { fireListClear as actionApiListClear } from './api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from './api/actions/list/get.js';
import { fireListProp as actionApiListProp } from './api/actions/list/prop.js';
import { fireListPush as actionApiListPush } from './api/actions/list/push.js';
import { fireListSlice as actionApiListSlice } from './api/actions/list/slice.js';
import { fireListSplice as actionApiListSplice } from './api/actions/list/splice.js';
import { fireListMerge as actionApiListMerge } from './api/actions/list/merge.js';
import { fireFormClear as actionApiFormClear } from './api/actions/form/clear.js';
import { fireFormMerge as actionApiFormMerge } from './api/actions/form/merge.js';
import { fireFormCreate as actionApiFormCreate } from './api/actions/form/create.js';
import { fireFormCreateFile as actionApiFormCreateFile } from './api/actions/form/createFile.js';
import { fireFormCreateOption as actionApiFormCreateOption } from './api/actions/form/createOption.js';
import { fireFormCreateOptions as actionApiFormCreateOptions } from './api/actions/form/createOptions.js';
import { fireFormDropOnCurrentPage as actionApiFormDropOnCurrentPage } from './api/actions/form/dropOnCurrentPage.js';
import { fireFormDropOnList as actionApiFormDropOnList } from './api/actions/form/dropOnList.js';
import { fireFormDropOption as actionApiFormDropOption } from './api/actions/form/dropOption.js';
import { fireFormRelation as actionApiFormRelation } from './api/actions/form/relation.js';
import { fireFormRestore as actionApiFormRestore } from './api/actions/form/restore.js';
import { fireFormUpdate as actionApiFormUpdate } from './api/actions/form/update.js';
import { fireFormUpdateOption as actionApiFormUpdateOption } from './api/actions/form/updateOption.js';
import { fireFormDrop as actionApiFormDrop } from './api/actions/form/drop.js';
import { fireFormEmpty as actionApiFormEmpty } from './api/actions/form/empty.js';
import { fireFormGet as actionApiFormGet } from './api/actions/form/get.js';
import { fireFormProp as actionApiFormProp } from './api/actions/form/prop.js';
import { fireFormPurge as actionApiFormPurge } from './api/actions/form/purge.js';

import { fireSchema as actionBreadcrumbsSchema } from './breadcrumbs/actions/schema.js';
import { fireClear as actionBreadcrumbsClear } from './breadcrumbs/actions/clear.js';
import { firePush as actionBreadcrumbsPush } from './breadcrumbs/actions/push.js';
import { fireSet as actionBreadcrumbsSet } from './breadcrumbs/actions/set.js';
import { fireDel as actionBreadcrumbsDel } from './breadcrumbs/actions/del.js';

import { fireSchema as actionDialogSchema } from './dialog/actions/schema.js';
import { fireOpen as actionDialogOpen } from './dialog/actions/open.js';
import { fireClose as actionDialogClose } from './dialog/actions/close.js';

import { fireSchema as actionLoaderSchema } from './loader/actions/schema.js';
import { fireShow as actionLoaderShow } from './loader/actions/show.js';
import { fireHide as actionLoaderHide } from './loader/actions/hide.js';
import { fireProp as actionLoaderProp } from './loader/actions/prop.js';

import { fireSchema as actionMenuSchema } from './menu/actions/schema.js';
import { fireOpen as actionMenuOpen } from './menu/actions/open.js';
import { fireClose as actionMenuClose } from './menu/actions/close.js';

import { fireFilter as actionUrlFilter } from './url/actions/filter.js';
import { fireFilterBoolSet as actionUrlFilterBoolSet } from './url/actions/filterBoolSet.js';
import { fireFilterClear as actionUrlFilterClear } from './url/actions/filterClear.js';
import { fireFilterSet as actionUrlFilterSet } from './url/actions/filterSet.js';
import { fireQuery as actionUrlQuery } from './url/actions/query.js';
import { fireSort as actionUrlSort } from './url/actions/sort.js';
import { fireUpdate as actionUrlUpdate } from './url/actions/update.js';

import {
	fireSet as actionQueueSet,
	fireClear as actionQueueClear,
} from './queue/actions';

export default getStore;
export {
	Provider,

	getSnackbarHook,
	setSnackbarHook,
	hookSnackbar,
	getUrlHook,
	setUrlHook,
	hookUrlNavigate,
	hookUrlLocation,
	hookUrlFilterBoolItem,
	hookUrlFilterItem,
	hookUrlLastPathItem,
	hookUrlPrevPathItem,
	hookUrlProperty,
	hookUrlServiceKey,
	hookUrlPathname,
	hookUrlClick,

	selectorMainArrayFind,
	selectorMainArrayFindByKeyValue,
	selectorMainArrayIncludes,
	selectorMainArrayIsArray,
	selectorMainExists,
	selectorMainExtract,
	selectorDialogVisible,
	selectorLoaderVisible,
	selectorLoaderProgressPercentage,
	selectorLoaderText,
	selectorMenuNode,
	selectorUrlFindFilterItem,

	actionApiSchema,
	actionApiListPurge,
	actionApiListBulk,
	actionApiListBulkDrop,
	actionApiListCheck,
	actionApiListDrop,
	actionApiListLimit,
	actionApiListPage,
	actionApiListRestore,
	actionApiListClear,
	actionApiListGet,
	actionApiListProp,
	actionApiListPush,
	actionApiListSlice,
	actionApiListSplice,
	actionApiListMerge,
	actionApiFormCreateFile,
	actionApiFormCreateOption,
	actionApiFormCreateOptions,
	actionApiFormDropOnCurrentPage,
	actionApiFormDropOnList,
	actionApiFormDropOption,
	actionApiFormRelation,
	actionApiFormRestore,
	actionApiFormUpdate,
	actionApiFormUpdateOption,
	actionApiFormClear,
	actionApiFormMerge,
	actionApiFormCreate,
	actionApiFormDrop,
	actionApiFormEmpty,
	actionApiFormGet,
	actionApiFormProp,
	actionApiFormPurge,

	actionBreadcrumbsSchema,
	actionBreadcrumbsClear,
	actionBreadcrumbsPush,
	actionBreadcrumbsSet,
	actionBreadcrumbsDel,
	
	actionDialogSchema,
	actionDialogOpen,
	actionDialogClose,
	
	actionLoaderSchema,
	actionLoaderShow,
	actionLoaderHide,
	actionLoaderProp,
	
	actionMenuSchema,
	actionMenuOpen,
	actionMenuClose,
	
	actionUrlFilter,
	actionUrlFilterBoolSet,
	actionUrlFilterSet,
	actionUrlFilterClear,
	actionUrlQuery,
	actionUrlSort,
	actionUrlUpdate,

	actionQueueSet,
	actionQueueClear,
};
