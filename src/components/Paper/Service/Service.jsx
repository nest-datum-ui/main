import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import { actionBreadcrumbsSet } from '@nest-datum-ui/Store';

let Service = ({ children }) => {
	const data = React.useContext(ContextProps);
	const pathnameSplit = window.location.pathname.split('/').slice(1);
	const { pageInitialFullUrl, title } = data[pathnameSplit[1]];

	React.useEffect(() => {
		actionBreadcrumbsSet('breadcrumbs-header', [
			...(window.location.pathname === `/${process.env.ROUTE_AUTHED}`)
				? [{
					text: '...',
					key: `/${process.env.ROUTE_AUTHED}`,
				}]
				: [{
					text: '...',
					key: `/${process.env.ROUTE_AUTHED}`,
				}, {
					text: title,
					key: pageInitialFullUrl,
				}]])();
	}, [
		pageInitialFullUrl,
		title,
	]);

	return <React.Fragment>
		{children}
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
};
Service.propTypes = {
};

export default Service;
