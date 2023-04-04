import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorMainExtract,
	actionApiListLimit,
	actionApiListPage,
	actionApiListPurge,
	actionApiListGet,
} from '@nest-datum-ui/Store';
import StyledWrapper from './Styled/Wrapper.jsx';

let Select = ({ storeName, apiUrl, itemKey, filter, ...props }) => {
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) || 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) || 20;
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(storeName, newPage), [
		storeName,
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(storeName, e), [
		storeName,
	]);

	React.useEffect(() => {
		actionApiListGet(storeName, {
			apiUrl,
			page,
			limit,
			filter,
		})();
	}, [
		storeName,
		apiUrl,
		page,
		limit,
		filter,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper { ...props } 
		page={page} 
		limit={limit} 
		total={total} 
		onChangePage={onChangePage}
		onLimit={onLimit}>
		{data
			&& data.map((item) => ({
				id: item.id,
				title: item[itemKey] || item.title || item.name,
			}))}
	</StyledWrapper>;
};

Select = React.memo(Select);
Select.defaultProps = {
};
Select.propSelects = {
	storeName: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	itemKey: PropTypes.string,
	filter: PropTypes.object,
};

export default Select;
