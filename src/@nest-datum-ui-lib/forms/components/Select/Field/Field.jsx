import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { FORMS_PATH_FIELD } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Select from '@nest-datum-ui/components/Select';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let Field = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FIELD, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FORMS_PATH_FIELD, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FORMS_PATH_FIELD, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(FORMS_PATH_FIELD, {
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

	React.useEffect(() => () => actionApiListClear(FORMS_PATH_FIELD)(), [
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

Field = React.memo(Field);
Field.defaultProps = {
	name: 'fieldId',
	multiple: false,
	onChange: () => {},
};
Field.propTypes = {
};

export default Field;
