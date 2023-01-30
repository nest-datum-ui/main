import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { SSO_PATH_USER } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Select from '@nest-datum-ui/components/Select';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let User = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_USER, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(SSO_PATH_USER, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(SSO_PATH_USER, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(SSO_PATH_USER, {
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

	React.useEffect(() => () => actionApiListClear(SSO_PATH_USER)(), [
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

User = React.memo(User);
User.defaultProps = {
	name: 'userId',
	multiple: false,
	onChange: () => {},
};
User.propTypes = {
};

export default User;
