import React from 'react';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import FormSearch from '@nest-datum-ui/components/Form/Search';

let Filter = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true), [
		location,
	]);
	const query = React.useMemo(() => utilsUrlSearchPathItem('query', window.location.search), [
	]);
	const onSearch = React.useCallback((newQuery) => {
		const currentQuery = utilsUrlSearchPathItem('query', window.location.search) || '';

		if (newQuery !== currentQuery) {
			actionApiListProp('logsTrafficList', 'loader', true)();

			let url = '',
				sort = utilsUrlSearchPathItem('sort', window.location.search, true);

			if (newQuery.length > 0) {
				url = `?query=${newQuery}`;
			}
			if (filter
				&& typeof filter === 'object'
				&& Object.keys(filter).length > 0) {
				url += url
					? `&filter=${JSON.stringify(filter)}`
					: `?filter=${JSON.stringify(filter)}`;
			}
			if (sort
				&& typeof sort === 'object'
				&& Object.keys(sort).length > 0) {
				url += url
					? `&sort=${JSON.stringify(sort)}`
					: `?sort=${JSON.stringify(sort)}`;
			}
			navigate(url);
		}
	}, [
		navigate,
		filter,
	]);
	
	return <React.Fragment>
		<FormSearch 
			onSearch={onSearch}
			defaultValue={query} />
	</React.Fragment>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
};
Filter.propTypes = {
};

export default Filter;
