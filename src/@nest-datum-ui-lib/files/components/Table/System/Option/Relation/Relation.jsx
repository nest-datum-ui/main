import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { FILES_PATH_SYSTEM_OPTION_RELATION } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import Item from './Item';

let Relation = ({
	systemOptionId,
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_SYSTEM_OPTION_RELATION, 'data' ]));
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FILES_PATH_SYSTEM_OPTION_RELATION, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FILES_PATH_SYSTEM_OPTION_RELATION , e), [
	]);
	const onDrop = React.useCallback((entityId) => (e) => actionDialogOpen(FILES_PATH_SYSTEM_OPTION_RELATION, { entityId })(), [
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(systemOptionId)) {
			actionApiListGet(FILES_PATH_SYSTEM_OPTION_RELATION, {
				filter: {
					systemOptionId,
				},
			})();
		}
	}, [
		unmount,
		systemOptionId
	]);

	React.useEffect(() => () => actionApiListClear(FILES_PATH_SYSTEM_OPTION_RELATION)(), [
	]);

	return <React.Fragment>
		<Loader visible={displayLoader} />
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					withChangeLimit
					total={total}
					page={page}
					limit={limit}
					length={(data || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCell key="system">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								System
							</Typography>
						</TableCell>,
						<TableCell key="createdAt">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Created at
							</Typography>
						</TableCell>,
					]}
					{ ...props }>
					{utilsCheckArr(data)
						&& data.map((item, index) => <Item
							key={item.id}
							systemOptionId={systemOptionId}
							id={item.id}
							systemId={item.systemId}
							createdAt={item.createdAt}
							onDrop={onDrop(item.id)} />)}
				</TablePagination>
			</React.Fragment>}
	</React.Fragment>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
	children: PropTypes.array,
};

export default Relation;
