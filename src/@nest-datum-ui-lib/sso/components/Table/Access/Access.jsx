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
	SSO_PATH_ACCESS,
	SSO_PATH_ACCESS_CREATE, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
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
import ButtonCreate from '@nest-datum-ui/components/Button/Create';
import SsoFormFilterStatusAccess from '@nest-datum-ui-lib/sso/components/Form/Filter/Status/Access';
import Item from './Item';

let Access = () => {
	const { search } = useLocation();
	const query = utilsUrlSearchPathItem('query', search);
	const select = utilsUrlSearchPathItem('select', search);
	const filter = utilsUrlSearchPathItem('filter', search);
	const sort = utilsUrlSearchPathItem('sort', search);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'data' ]));
	const storePath = React.useMemo(() => [ 'api', 'list', SSO_PATH_ACCESS ], [
	]);
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(SSO_PATH_ACCESS, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(SSO_PATH_ACCESS, e), [
	]);
	const onSortId = React.useCallback((value) => actionApiListSort(SSO_PATH_ACCESS, 'id', value), [
	]);
	const onSortCreatedAt = React.useCallback((value) => actionApiListSort(SSO_PATH_ACCESS, 'createdAt', value), [
	]);
	const onDrop = React.useCallback((id) => (e) => actionApiListDrop(SSO_PATH_ACCESS, id), [
	]);
	const onRestore = React.useCallback((id) => (e) => actionApiListRestore(SSO_PATH_ACCESS, id), [
	]);
	const onCheck = React.useCallback((id) => actionApiListCheck(SSO_PATH_ACCESS, id), [
	]);
	const onBulk = React.useCallback((e) => actionApiListBulk(SSO_PATH_ACCESS, e), [
	]);
	const onBulkDrop = React.useCallback(() => actionApiListBulkDrop(SSO_PATH_ACCESS), [
	]);
	const onLoader = React.useCallback(() => actionApiListProp(SSO_PATH_ACCESS, 'loader', true)(), [
	]);
	const onMenu = React.useCallback((id) => (e) => actionMenuOpen(id, e.target)(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(SSO_PATH_ACCESS, {
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

	React.useEffect(() => () => actionApiListClear(SSO_PATH_ACCESS)(), [
	]);

	return <React.Fragment>
		<FormFilter 
			bulkDeletion
			toolbarComponent={<ButtonCreate to={SSO_PATH_ACCESS_CREATE} />}
			storePath={storePath}
			loader={displayLoader}
			length={(data || []).length ?? 0}
			onBulk={onBulk}
			onDrop={onBulkDrop}
			onLoader={onLoader}>
			<FormFilterIsDeleted onInput={onLoader} />
			<FormFilterIsNotDelete onInput={onLoader} />
			<SsoFormFilterStatusAccess onInput={onLoader} />
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
						<TableCell key="main">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Main
							</Typography>
						</TableCell>,
						<TableCell key="accessStatusId">
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
						name={item.name}
						description={item.description}
						accessStatusId={item.accessStatusId}
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

Access = React.memo(Access);
Access.defaultProps = {
};
Access.propTypes = {
};

export default Access;
