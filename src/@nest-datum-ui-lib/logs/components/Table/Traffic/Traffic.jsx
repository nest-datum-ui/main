import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { fireListSort as actionApiListSort } from '@nest-datum-ui/components/Store/api/actions/list/sort.js';
import { fireListDrop as actionApiListDrop } from '@nest-datum-ui/components/Store/api/actions/list/drop.js';
import { fireListBulk as actionApiListBulk } from '@nest-datum-ui/components/Store/api/actions/list/bulk.js';
import { fireListBulkDrop as actionApiListBulkDrop } from '@nest-datum-ui/components/Store/api/actions/list/bulkDrop.js';
import { fireListCheck as actionApiListCheck } from '@nest-datum-ui/components/Store/api/actions/list/check.js';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import { LOGS_PATH_TRAFFIC } from '@nest-datum-ui-lib/logs/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableCellSort from '@nest-datum-ui/components/Table/Cell/Sort';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import FormFilter from '@nest-datum-ui/components/Form/Filter';
import Item from './Item';

let Notification = () => {
	const { search } = useLocation();
	const query = utilsUrlSearchPathItem('query', search);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_TRAFFIC, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_TRAFFIC, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_TRAFFIC, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_TRAFFIC, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', LOGS_PATH_TRAFFIC, 'data' ]));
	const storePath = React.useMemo(() => [ 'api', 'list', LOGS_PATH_TRAFFIC ], [
	]);
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(LOGS_PATH_TRAFFIC, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(LOGS_PATH_TRAFFIC, e), [
	]);
	const onSortId = React.useCallback((value) => actionApiListSort(LOGS_PATH_TRAFFIC, 'id', value), [
	]);
	const onSortCreatedAt = React.useCallback((value) => actionApiListSort(LOGS_PATH_TRAFFIC, 'createdAt', value), [
	]);
	const onDrop = React.useCallback((id) => (e) => actionApiListDrop(LOGS_PATH_TRAFFIC, id), [
	]);
	const onCheck = React.useCallback((id) => actionApiListCheck(LOGS_PATH_TRAFFIC, id), [
	]);
	const onBulk = React.useCallback((e) => actionApiListBulk(LOGS_PATH_TRAFFIC, e), [
	]);
	const onBulkDrop = React.useCallback(() => actionApiListBulkDrop(LOGS_PATH_TRAFFIC), [
	]);
	const onMenu = React.useCallback((id) => (e) => actionMenuOpen(id, e.target)(), [
	]);
	const onLoader = React.useCallback(() => actionApiListProp(LOGS_PATH_TRAFFIC, 'loader', true)(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(LOGS_PATH_TRAFFIC, {
				page,
				limit,
				query,
			})();
		}
	}, [
		unmount,
		page,
		limit,
		query,
	]);

	React.useEffect(() => () => actionApiListClear(LOGS_PATH_TRAFFIC)(), [
	]);

	return <React.Fragment>
		<FormFilter 
			bulkDeletion
			storePath={storePath}
			loader={displayLoader}
			length={(data || []).length ?? 0}
			onBulk={onBulk}
			onDrop={onBulkDrop}
			onLoader={onLoader} />
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					bulkDeletion
					withChangeLimit
					loader={loader}
					total={total}
					page={page}
					limit={limit}
					length={(data || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCellSort 
							key="id"
							name="id"
							onChange={onSortId}>
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								ID
							</Typography>
						</TableCellSort>,
						<TableCell key="replica">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Replica
							</Typography>
						</TableCell>,
						<TableCell key="source">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Source
							</Typography>
						</TableCell>,
						<TableCell key="user">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								User
							</Typography>
						</TableCell>,
						<TableCellSort 
							key="createdAt"
							name="createdAt"
							onChange={onSortCreatedAt}>
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Story
							</Typography>
						</TableCellSort>,
					]}>
					{utilsCheckArr(data)
						&& data.map((item) => <Item
							bulkDeletion
							key={item.id}
							id={item.id}
							servId={item.servId}
							replicaId={item.replicaId}
							method={item.method}
							route={item.route}
							referrer={item.referrer}
							ipAddr={item.ipAddr}
							userId={item.userId}
							createdAt={item.createdAt}
							onDrop={onDrop(item.id)}
							onMenu={onMenu(item.id)}
							onCheck={onCheck(item.id)}
							storePath={storePath} />)}
				</TablePagination>
			</React.Fragment>}
		</React.Fragment>;
};

Notification = React.memo(Notification);
Notification.defaultProps = {
};
Notification.propTypes = {
};

export default Notification;
