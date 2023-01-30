import React from 'react';
import { useSelector } from 'react-redux';
// import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
// import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { REGISTRY_PATH_SERV } from '@nest-datum-ui-lib/registry/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import Item from './Item';

let Serv = () => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'data' ]));
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(REGISTRY_PATH_SERV, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(REGISTRY_PATH_SERV, e), [
	]);

	// React.useEffect(() => {
	// 	if (!unmount) {
	// 		actionApiListGet(REGISTRY_PATH_SERV, {
	// 			page,
	// 			limit,
	// 		})();
	// 	}
	// }, [
	// 	unmount,
	// 	page,
	// 	limit,
	// ]);

	// React.useEffect(() => () => actionApiListClear(REGISTRY_PATH_SERV)(), [
	// ]);

	return <React.Fragment>
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					withChangeLimit
					loader={loader}
					total={total}
					page={page}
					limit={limit}
					length={(data || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCell key="id">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								ID
							</Typography>
						</TableCell>,
						<TableCell key="name">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Name
							</Typography>
						</TableCell>,
						<TableCell key="network">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Network
							</Typography>
						</TableCell>,
						<TableCell key="status">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Status
							</Typography>
						</TableCell>,
						<TableCell key="load">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Load
							</Typography>
						</TableCell>,
						<TableCell key="createdAt">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Story
							</Typography>
						</TableCell>,
					]}>
					{utilsCheckArr(data)
						&& data.map((item) => <Item
							key={item.id}
							id={item.id}
							name={item.name}
							host={item.host}
							port={item.port}
							mysqlMasterHost={item.mysqlMasterHost}
							mysqlMasterPort={item.mysqlMasterPort}
							active={item.active}
							serviceResponsLoadingIndicator={item.serviceResponsLoadingIndicator}
							createdAt={item.createdAt}
							updatedAt={item.updatedAt}
							restartedAt={item.restartedAt} />)}
				</TablePagination>
			</React.Fragment>}
		</React.Fragment>;
};

Serv = React.memo(Serv);
Serv.defaultProps = {
};
Serv.propTypes = {
};

export default Serv;
