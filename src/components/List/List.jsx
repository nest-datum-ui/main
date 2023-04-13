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

let ListMemo = ({ 
	apiUrl: propsApiUrl,
	page, 
	limit, 
	query, 
	select, 
	filter, 
	initialFilter, 
	sort, 
	processFilter,
	ManageComponent,
	children, 
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				apiFullUrl: contextApiUrl, 
				withFilter, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const apiUrl = propsApiUrl ?? contextApiUrl;
	const updatedIndex = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'updatedIndex' ])) || 0;

	React.useEffect(() => {
		if (updatedIndex >= 0) {
			actionApiListGet(storeName, {
				apiUrl,
				page,
				limit,
				query,
				select,
				filter: processFilter(utilsCheckFunc(initialFilter)
					? initialFilter()
					: (filter ?? initialFilter)),
				sort,
			})();
		}
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
		processFilter,
		updatedIndex,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper { ...props }>
		{withFilter && <PaperFilter ManageComponent={ManageComponent} />}
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
	processFilter: (data) => data,
};
List.propTypes = {
	querySource: PropTypes.string,
	processFilter: PropTypes.func,
};

export default List;
