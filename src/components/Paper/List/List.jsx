import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	actionBreadcrumbsDel,
	actionBreadcrumbsSet, 
	actionQueueClear,
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

let List = ({ children }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { parentName } } } = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageTitle, pageFullUrl, breadcrumbsMenuTitle, orderInHeaderTabMenu, prevPage = [] } } } = React.useContext(ContextProps);

	React.useEffect(() => {
		setTimeout(() => {
			(orderInHeaderTabMenu === 0)
				? actionBreadcrumbsDel('breadcrumbs-header', 0, 2)()
				: actionBreadcrumbsSet('breadcrumbs-header', [ ...prevPage, { key: pageFullUrl, text: breadcrumbsMenuTitle }], ((prevPage[0] || {}).orderInHeaderTabMenu === 0) ? 1 : 2, 5)();
		}, 0);
	}, [
		orderInHeaderTabMenu,
		pageFullUrl,
		breadcrumbsMenuTitle,
		prevPage,
	]);

	React.useEffect(() => () => {
		actionQueueClear();
	}, [
	]);

	return <React.Fragment>
		<Box py={1}>
			<Typography component="div" variant="h5">
				{pageTitle}
			</Typography>
		</Box>
		{children}
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
