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
	MAIL_PATH_LETTER_STATUS,
	MAIL_PATH_LETTER_STATUS_CREATE, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableStatus from '@nest-datum-ui/components/Table/Status';
import TableStatusItem from '@nest-datum-ui/components/Table/Status/Item';
import FormFilterIsDeleted from '@nest-datum-ui/components/Form/Filter/IsDeleted';
import FormFilterIsNotDelete from '@nest-datum-ui/components/Form/Filter/IsNotDelete';
import FormFilter from '@nest-datum-ui/components/Form/Filter';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';

let Status = () => {
	const { search } = useLocation();
	const query = utilsUrlSearchPathItem('query', search);
	const select = utilsUrlSearchPathItem('select', search);
	const filter = utilsUrlSearchPathItem('filter', search);
	const sort = utilsUrlSearchPathItem('sort', search);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'data' ]));
	const storePath = React.useMemo(() => [ 'api', 'list', MAIL_PATH_LETTER_STATUS ], [
	]);
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(MAIL_PATH_LETTER_STATUS, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(MAIL_PATH_LETTER_STATUS, e), [
	]);
	const onSortId = React.useCallback((value) => actionApiListSort(MAIL_PATH_LETTER_STATUS, 'id', value), [
	]);
	const onSortCreatedAt = React.useCallback((value) => actionApiListSort(MAIL_PATH_LETTER_STATUS, 'createdAt', value), [
	]);
	const onDrop = React.useCallback((id) => (e) => actionApiListDrop(MAIL_PATH_LETTER_STATUS, id), [
	]);
	const onRestore = React.useCallback((id) => (e) => actionApiListRestore(MAIL_PATH_LETTER_STATUS, id), [
	]);
	const onCheck = React.useCallback((id) => actionApiListCheck(MAIL_PATH_LETTER_STATUS, id), [
	]);
	const onBulk = React.useCallback((e) => actionApiListBulk(MAIL_PATH_LETTER_STATUS, e), [
	]);
	const onBulkDrop = React.useCallback(() => actionApiListBulkDrop(MAIL_PATH_LETTER_STATUS), [
	]);
	const onLoader = React.useCallback(() => actionApiListProp(MAIL_PATH_LETTER_STATUS, 'loader', true)(), [
	]);
	const onMenu = React.useCallback((id) => (e) => actionMenuOpen(id, e.target)(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(MAIL_PATH_LETTER_STATUS, {
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

	React.useEffect(() => () => actionApiListClear(MAIL_PATH_LETTER_STATUS)(), [
	]);

	return <React.Fragment>
		<FormFilter 
			bulkDeletion
			toolbarComponent={<ButtonCreate to={MAIL_PATH_LETTER_STATUS_CREATE} />}
			storePath={storePath}
			loader={displayLoader}
			length={(data || []).length ?? 0}
			onBulk={onBulk}
			onDrop={onBulkDrop}
			onLoader={onLoader}>
			<FormFilterIsDeleted onInput={onLoader} />
			<FormFilterIsNotDelete onInput={onLoader} />
		</FormFilter>
		<TableStatus
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
				&& data.map((item) => <TableStatusItem
					bulkDeletion
					key={item.id}
					id={item.id}
					to={`/mail/letter/statuses/${item.id}`}
					name={item.name}
					description={item.description}
					createdAt={item.createdAt}
					updatedAt={item.updatedAt}
					isDeleted={item.isDeleted}
					isNotDelete={item.isNotDelete}
					onDrop={onDrop(item.id)}
					onRestore={onRestore(item.id)}
					onMenu={onMenu(item.id)}
					onCheck={onCheck(item.id)}
					storePath={storePath} />)}
		</TableStatus>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;
