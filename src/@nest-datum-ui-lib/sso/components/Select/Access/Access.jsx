import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { SSO_PATH_ACCESS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Select from '@nest-datum-ui/components/Select';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let Access = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(SSO_PATH_ACCESS, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(SSO_PATH_ACCESS, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(SSO_PATH_ACCESS, {
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

	React.useEffect(() => () => actionApiListClear(SSO_PATH_ACCESS)(), [
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

Access = React.memo(Access);
Access.defaultProps = {
	name: 'accessId',
	multiple: false,
	onChange: () => {},
};
Access.propTypes = {
};

export default Access;
