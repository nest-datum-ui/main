import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiListPurge,
	actionApiListGet,
	hookUrlProperty, 
} from '@nest-datum-ui/Store';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import PaperFilter from 'components/Paper/Filter';
import StyledWrapper from './Styled/Wrapper.jsx';

let ListMemo = ({ page, limit, query, select, filter, initialFilter, sort, children, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				apiFullUrl: 
				apiUrl, 
				withFilter, 
			}, 
		}, 
	} = React.useContext(ContextProps);

	React.useEffect(() => {
		actionApiListGet(storeName, {
			apiUrl,
			page,
			limit,
			query,
			select,
			filter: utilsCheckFunc(initialFilter)
				? initialFilter()
				: (filter ?? initialFilter),
			sort,
		})();
	}, [
		storeName,
		apiUrl,
		page,
		limit,
		query,
		select,
		filter,
		initialFilter,
		sort,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper { ...props }>
		{withFilter && <PaperFilter />}
		{children}
	</StyledWrapper>;
};

ListMemo = React.memo(ListMemo);

let ListUrlQuerySource = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				initialPage, 
				initialLimit, 
				select: initialSelect,
				filter: initialFilter,
				sort: initialSort, 
			}, 
		},
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const queryUrl = hookUrlProperty('query', search);
	const selectUrl = hookUrlProperty('select', search) ?? initialSelect;
	const filterUrl = hookUrlProperty('filter', search) ?? initialFilter;
	const sortUrl = hookUrlProperty('sort', search) ?? initialSort;
	const pageUrl = Number(hookUrlProperty('page', search) || initialPage);
	const limitUrl = Number(hookUrlProperty('limit', search) || initialLimit);

	return <ListMemo
		query={queryUrl}
		select={selectUrl}
		filter={filterUrl}
		sort={sortUrl}
		page={pageUrl}
		limit={limitUrl}
		{ ...props } />;
};

ListUrlQuerySource = React.memo(ListUrlQuerySource);

let ListStoreQuerySource = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName, 
				initialPage, 
				initialLimit, 
				select: initialSelect,
				filter: initialFilter,
				sort: initialSort, 
			}, 
		},
	} = React.useContext(ContextProps);
	const query = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'query' ]));
	const select = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'select' ])) ?? initialSelect;
	const filter = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'filter' ])) ?? initialFilter;
	const sort = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'sort' ])) ?? initialSort;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? initialPage;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? initialLimit;

	return <ListMemo
		query={query}
		select={select}
		filter={filter}
		sort={sort}
		page={page}
		limit={limit}
		{ ...props } />;
};

ListStoreQuerySource = React.memo(ListStoreQuerySource);

let List = ({ querySource, ...props }) => {
	return (querySource === 'url')
		? <ListUrlQuerySource { ...props } />
		: ((querySource === 'store')
			? <ListStoreQuerySource { ...props } />
			: <ListMemo { ...props } />);
};

List = React.memo(List);
List.defaultProps = {
	querySource: 'url',
};
List.propTypes = {
	querySource: PropTypes.string,
};

export default List;
