import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { DATA_TYPE_PATH_TYPE } from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Select from '@nest-datum-ui/components/Select';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let Type = ({
	children,
	filter,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(DATA_TYPE_PATH_TYPE, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(DATA_TYPE_PATH_TYPE, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(DATA_TYPE_PATH_TYPE, {
				page,
				limit,
				query,
				...(typeof filter === 'function')
					? { filter: filter() }
					: {},
			})();
		}
	}, [
		unmount,
		page,
		limit,
		query,
		filter,
	]);

	React.useEffect(() => () => actionApiListClear(DATA_TYPE_PATH_TYPE)(), [
	]);

	return <React.Fragment>
		<LoaderSmall visible={loaderVisible} />
		{!loaderVisible
			&& <Select 
				{ ...props }
				total={total}
				page={page}
				limit={limit}
				onChangePage={onChangePage}
				onLimit={onLimit}
				onSearch={onSearch}>
				{data}
			</Select>}
	</React.Fragment>;
};

Type = React.memo(Type);
Type.defaultProps = {
	name: 'typeId',
	multiple: false,
	onChange: () => {},
};
Type.propTypes = {
	filter: PropTypes.func,
};

export default Type;
