import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fireListProp as actionApiListProp } from 'components/Store/api/actions/list/prop.js';
import utilsUrlSearchPathItem from 'utils/url/searchPathItem.js';
import FormSearch from 'components/Form/Search';

let Filter = () => {
	const navigate = useNavigate();
	const query = React.useMemo(() => utilsUrlSearchPathItem('query', window.location.search), [
	]);
	const onSearch = React.useCallback((newQuery) => {
		const currentQuery = utilsUrlSearchPathItem('query', window.location.search) || '';

		if (newQuery !== currentQuery) {
			actionApiListProp('errList', 'loader', true)();

			let url = '',
				sort = utilsUrlSearchPathItem('sort', window.location.search, true);

			if (newQuery.length > 0) {
				url = `?query=${newQuery}`;
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
