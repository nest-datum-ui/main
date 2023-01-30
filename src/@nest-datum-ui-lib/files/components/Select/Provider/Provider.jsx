import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { FILES_PATH_PROVIDER } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Select from '@nest-datum-ui/components/Select';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let Provider = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FILES_PATH_PROVIDER, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FILES_PATH_PROVIDER, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(FILES_PATH_PROVIDER, {
				page,
				limit,
				query,
			})();
		}
	}, [
		unmount,
		page,
		limit,
		query,
	]);

	React.useEffect(() => () => actionApiListClear(FILES_PATH_PROVIDER)(), [
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

Provider = React.memo(Provider);
Provider.defaultProps = {
	name: 'providerId',
	multiple: false,
	onChange: () => {},
};
Provider.propTypes = {
};

export default Provider;
