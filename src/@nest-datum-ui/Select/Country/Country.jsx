import React from 'react';
import { useSelector } from 'react-redux';
import {
	ContextService, 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	// actionApiListGet,
	actionApiListPage,
	actionApiListLimit,
	actionApiListClear,
} from '@nest-datum-ui/Store';
import { arr as utilsCheckArr } from '@nest-datum-utils/check';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledMenuItem from './Styled/MenuItem.jsx';
import phoneList from 'tmp/phoneList.js';

let Country = ({
	children,
	value,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const loaderVisible = !utilsCheckArr(data) || loader || unmount;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(storeName, newPage), [
		storeName,
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(storeName, e), [
		storeName,
	]);

	React.useEffect(() => {
		if (!unmount) {
			// TODO:
			// actionApiListGet(storeName, {
			// 	page,
			// 	limit,
			// })();
			actionApiListClear(storeName, {
				page: 1,
				limit: 20,
				data: Object.values(phoneList),
			})();
		}
	}, [
		unmount,
		storeName,
	]);

	React.useEffect(() => () => {
		actionApiListClear(process.env.URL_API_COUNTRIES)();
	}, [
	]);

	return <StyledWrapper 
		loader={loaderVisible}
		total={total}
		page={page}
		limit={limit}
		onChangePage={onChangePage}
		onLimit={onLimit}
		value={(data || []).find((item) => item.phoneCode === value)
			? value
			: ''}
		labelProps={{ disableAnimation: true }}
		{ ...props }>
		{children
			? children
			: (data || []).map((item) => {
				return <StyledMenuItem 
					key={item.id}
					value={item.phoneCode}
					active={item.active}>
					{item.isoCode1} +{item.phoneCode}
				</StyledMenuItem>;
			})}
	</StyledWrapper>;
};

Country = React.memo(Country);
Country.defaultProps = {
};
Country.propTypes = {
};

export default Country;
