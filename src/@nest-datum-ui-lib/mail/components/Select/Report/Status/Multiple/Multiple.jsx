import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { MAIL_PATH_REPORT_STATUS } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import SelectMultiple from '@nest-datum-ui/components/Select/Multiple';
import LoaderSmall from '@nest-datum-ui/components/Loader/Small';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

let Status = ({
	value,
	defaultValue,
	children,
	...props
}) => {
	const state = value ?? defaultValue;
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'query' ])) || '';
	const data = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_REPORT_STATUS, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(MAIL_PATH_REPORT_STATUS, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(MAIL_PATH_REPORT_STATUS, e), [
	]);
	const onSearch = React.useCallback(() => {}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(MAIL_PATH_REPORT_STATUS, {
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

	React.useEffect(() => () => actionApiListClear(MAIL_PATH_REPORT_STATUS)(), [
	]);

	return <React.Fragment>
		<LoaderSmall visible={loaderVisible} />
		{!loaderVisible
			&& <SelectMultiple 
				{ ...props }
				value={value}
				defaultValue={defaultValue}
				total={total}
				page={page}
				limit={limit}
				onChangePage={onChangePage}
				onLimit={onLimit}
				onSearch={onSearch}>
				{data.map((item) => ({
					...item,
					active: !!state.find((stateItem) => stateItem.value === item.id),
				}))}
			</SelectMultiple>}
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	name: 'reportStatusId',
	multiple: false,
	onChange: () => {},
};
Status.propTypes = {
	value: PropTypes.array,
	defaultValue: PropTypes.array,
};

export default Status;
