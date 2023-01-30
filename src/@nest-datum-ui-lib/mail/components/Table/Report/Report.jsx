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
import { MAIL_PATH_REPORT } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort from '@nest-datum-ui/components/Table/Cell/Sort';
import FormFilterIsDeleted from '@nest-datum-ui/components/Form/Filter/IsDeleted';
import FormFilterIsNotDelete from '@nest-datum-ui/components/Form/Filter/IsNotDelete';
import FormFilter from '@nest-datum-ui/components/Form/Filter';
import MailFormFilterStatusReport from '@nest-datum-ui-lib/mail/components/Form/Filter/Status/Report';
import Item from './Item';

let Content = () => {
	const { search } = useLocation();
	const query = utilsUrlSearchPathItem('query', search);
	const select = utilsUrlSearchPathItem('select', search);
	const filter = utilsUrlSearchPathItem('filter', search);
	const sort = utilsUrlSearchPathItem('sort', search);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT, 'data' ]));
	const storePath = React.useMemo(() => [ 'api', 'list', MAIL_PATH_REPORT ], [
	]);
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(MAIL_PATH_REPORT, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(MAIL_PATH_REPORT, e), [
	]);
	const onSortId = React.useCallback((value) => actionApiListSort(MAIL_PATH_REPORT, 'id', value), [
	]);
	const onSortCreatedAt = React.useCallback((value) => actionApiListSort(MAIL_PATH_REPORT, 'createdAt', value), [
	]);
	const onDrop = React.useCallback((id) => (e) => actionApiListDrop(MAIL_PATH_REPORT, id), [
	]);
	const onRestore = React.useCallback((id) => (e) => actionApiListRestore(MAIL_PATH_REPORT, id), [
	]);
	const onCheck = React.useCallback((id) => actionApiListCheck(MAIL_PATH_REPORT, id), [
	]);
	const onBulk = React.useCallback((e) => actionApiListBulk(MAIL_PATH_REPORT, e), [
	]);
	const onBulkDrop = React.useCallback(() => actionApiListBulkDrop(MAIL_PATH_REPORT), [
	]);
	const onLoader = React.useCallback(() => actionApiListProp(MAIL_PATH_REPORT, 'loader', true)(), [
	]);
	const onMenu = React.useCallback((id) => (e) => actionMenuOpen(id, e.target)(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(MAIL_PATH_REPORT, {
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

	React.useEffect(() => () => actionApiListClear(MAIL_PATH_REPORT)(), [
	]);

	return <React.Fragment>
		<FormFilter 
			bulkDeletion
			storePath={storePath}
			loader={displayLoader}
			length={(data || []).length ?? 0}
			onBulk={onBulk}
			onDrop={onBulkDrop}
			onLoader={onLoader}>
			<FormFilterIsDeleted onInput={onLoader} />
			<FormFilterIsNotDelete onInput={onLoader} />
			<MailFormFilterStatusReport onInput={onLoader} />
		</FormFilter>
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					bulkDeletion
					withChangeLimit
					loader={loader}
					total={total}
					page={page}
					limit={limit}
					length={data.length}
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
						<TableCell key="action">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Action
							</Typography>
						</TableCell>,
						<TableCell key="content">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Content
							</Typography>
						</TableCell>,
						<TableCell key="reportStatusId">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Status
							</Typography>
						</TableCell>,
						<TableCell key="userId">
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
					{data.map((item) => <Item
						bulkDeletion
						key={item.id}
						id={item.id}
						action={item.action}
						content={item.content}
						reportStatusId={item.reportStatusId}
						userId={item.userId}
						createdAt={item.createdAt}
						updatedAt={item.updatedAt}
						isDeleted={item.isDeleted}
						isNotDelete={item.isNotDelete}
						onDrop={onDrop(item.id)}
						onRestore={onRestore(item.id)}
						onMenu={onMenu(item.id)}
						onCheck={onCheck(item.id)}
						storePath={storePath} />)}
				</TablePagination>
			</React.Fragment>}
		</React.Fragment>;
};

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propTypes = {
};

export default Content;
