import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionUrlSort,
	actionUrlUpdate,
} from '@nest-datum-ui/Store';
import TablePagination from '@nest-datum-ui/Table/Pagination';

let Table = ({ children, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				rowColumns, 
				bulkDeletion, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ]));
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ]));
	const onChangePage = React.useCallback((e, newPage) => actionUrlUpdate('page', newPage), [
	]);
	const onLimit = React.useCallback((e) => actionUrlUpdate('limit', e.target.value), [
	]);
	const onSort = React.useCallback((key) => (value) => actionUrlSort(storeName, key, value), [
		storeName,
	]);

	return <TablePagination
		loader={loader || unmount === true}
		total={total}
		page={page}
		limit={limit}
		length={dataLength}
		onChange={onChangePage}
		onLimit={onLimit}
		bulkDeletion={bulkDeletion}
		headRowCells={rowColumns.map((item) => ({ ...item, onSort: onSort(item.id) }))}
		{ ...props }>
		{children}
	</TablePagination>;
};

Table = React.memo(Table);
Table.defaultProps = {
	withChangeLimit: true,
};
Table.propTypes = {
	storeName: PropTypes.string, 
	apiUrl: PropTypes.string, 
	initialPage: PropTypes.number, 
	initialLimit: PropTypes.number, 
	rowColumns: PropTypes.array,
	withChangeLimit: PropTypes.bool,
};

export default Table;
