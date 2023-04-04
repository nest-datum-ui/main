import React from 'react';
import { useSelector } from 'react-redux';
import { 
	selectorMainExtract,
	actionApiListClear, 
	actionBreadcrumbsSet,
} from '@nest-datum-ui/Store';
import importSchema from 'importSchema.js';
import Divider from '@mui/material/Divider';
import Progress from '@nest-datum-ui/Progress';
import Item from './Item';
import ItemDashboard from './Item/Dashboard';
import StyledWrapper from './Styled/Wrapper.jsx';

let Aside = ({ id, ...props }) => {
	const data = useSelector(selectorMainExtract([ 'api', 'list', id, 'data' ]));
	const onClick = React.useCallback((e, { title: text, url: key }) => actionBreadcrumbsSet('breadcrumbs-header', [
	...(key === `/${process.env.ROUTE_AUTHED}`)
		? [{
			text: '...',
			key: `/${process.env.ROUTE_AUTHED}`,
		}]
		: [{
			text: '...',
			key: `/${process.env.ROUTE_AUTHED}`,
		}, {
			text,
			key,
		}]])(), [
	]);

	React.useEffect(() => {
		actionApiListClear(id, { data: Object.keys(importSchema) })();
	}, [
		id,
	]);

	return <StyledWrapper disablePadding>
		<ItemDashboard onClick={onClick} />
		<Progress visible={!data} />
		<Divider />
		{(data || []).map((item, index) => <Item key={item} name={item} onClick={onClick} />)}
	</StyledWrapper>;
};

Aside = React.memo(Aside);
Aside.defaultProps = {
	id: 'menu-aside',
};
Aside.propTypes = {
};

export default Aside;
