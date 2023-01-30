import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { fireListSort as actionApiListSort } from '@nest-datum-ui/components/Store/api/actions/list/sort.js';
import { fireListDrop as actionApiListDrop } from '@nest-datum-ui/components/Store/api/actions/list/drop.js';
import { fireListRestore as actionApiListRestore } from '@nest-datum-ui/components/Store/api/actions/list/restore.js';
import { fireListBulk as actionApiListBulk } from '@nest-datum-ui/components/Store/api/actions/list/bulk.js';
import { fireListBulkDrop as actionApiListBulkDrop } from '@nest-datum-ui/components/Store/api/actions/list/bulkDrop.js';
import { fireListCheck as actionApiListCheck } from '@nest-datum-ui/components/Store/api/actions/list/check.js';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import { 
	FILES_PATH_PROVIDER_OPTION,
	FILES_PATH_PROVIDER_OPTION_CREATE, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableOption from '@nest-datum-ui/components/Table/Option';
import TableOptionItem from '@nest-datum-ui/components/Table/Option/Item';
import FormFilterIsDeleted from '@nest-datum-ui/components/Form/Filter/IsDeleted';
import FormFilterIsNotDelete from '@nest-datum-ui/components/Form/Filter/IsNotDelete';
import FormFilter from '@nest-datum-ui/components/Form/Filter';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';

let Option = () => {
	const { search } = useLocation();
	const query = utilsUrlSearchPathItem('query', search);
	const select = utilsUrlSearchPathItem('select', search);
	const filter = utilsUrlSearchPathItem('filter', search);
	const sort = utilsUrlSearchPathItem('sort', search);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_OPTION, 'data' ]));
	const storePath = React.useMemo(() => [ 'api', 'list', FILES_PATH_PROVIDER_OPTION ], [
	]);
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FILES_PATH_PROVIDER_OPTION, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FILES_PATH_PROVIDER_OPTION, e), [
	]);
	const onSortId = React.useCallback((value) => actionApiListSort(FILES_PATH_PROVIDER_OPTION, 'id', value), [
	]);
	const onSortCreatedAt = React.useCallback((value) => actionApiListSort(FILES_PATH_PROVIDER_OPTION, 'createdAt', value), [
	]);
	const onDrop = React.useCallback((id) => (e) => actionApiListDrop(FILES_PATH_PROVIDER_OPTION, id), [
	]);
	const onRestore = React.useCallback((id) => (e) => actionApiListRestore(FILES_PATH_PROVIDER_OPTION, id), [
	]);
	const onCheck = React.useCallback((id) => actionApiListCheck(FILES_PATH_PROVIDER_OPTION, id), [
	]);
	const onBulk = React.useCallback((e) => actionApiListBulk(FILES_PATH_PROVIDER_OPTION, e), [
	]);
	const onBulkDrop = React.useCallback(() => actionApiListBulkDrop(FILES_PATH_PROVIDER_OPTION), [
	]);
	const onLoader = React.useCallback(() => actionApiListProp(FILES_PATH_PROVIDER_OPTION, 'loader', true)(), [
	]);
	const onMenu = React.useCallback((id) => (e) => actionMenuOpen(id, e.target)(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(FILES_PATH_PROVIDER_OPTION, {
				page,
				limit,
				query,
				select,
				filter,
				sort,
			})();
		}
	}, [
		unmount,
		page,
		limit,
		query,
		select,
		filter,
		sort,
	]);

	React.useEffect(() => () => actionApiListClear(FILES_PATH_PROVIDER_OPTION)(), [
	]);

	return <React.Fragment>
		<FormFilter 
			bulkDeletion
			toolbarComponent={<ButtonCreate to={FILES_PATH_PROVIDER_OPTION_CREATE} />}
			storePath={storePath}
			loader={displayLoader}
			length={(data || []).length ?? 0}
			onBulk={onBulk}
			onDrop={onBulkDrop}
			onLoader={onLoader}>
			<FormFilterIsDeleted onInput={onLoader} />
			<FormFilterIsNotDelete onInput={onLoader} />
		</FormFilter>
		<TableOption
			bulkDeletion
			loader={displayLoader}
			total={total}
			page={page}
			limit={limit}
			onChangePage={onChangePage}
			onLimit={onLimit}
			onSortId={onSortId}
			onSortCreatedAt={onSortCreatedAt}>
			{utilsCheckArr(data)
				&& data.map((item) => <TableOptionItem
					bulkDeletion
					key={item.id}
					id={item.id}
					to={`/files/provider/options/${item.id}`}
					name={item.name}
					description={item.description}
					dataTypeId={item.dataTypeId}
					defaultValue={item.defaultValue}
					regex={item.regex}
					isRequired={item.isRequired}
					isMultiline={item.isMultiline}
					isDeleted={item.isDeleted}
					isNotDelete={item.isNotDelete}
					createdAt={item.createdAt}
					updatedAt={item.updatedAt}
					onDrop={onDrop(item.id)}
					onRestore={onRestore(item.id)}
					onMenu={onMenu(item.id)}
					onCheck={onCheck(item.id)}
					storePath={storePath} />)}
		</TableOption>
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
