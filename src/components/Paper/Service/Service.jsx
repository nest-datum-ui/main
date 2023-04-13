import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import { actionBreadcrumbsSet } from '@nest-datum-ui/Store';
import StyledWrapper from './Styled/Wrapper.jsx';

let Service = ({ children, ...props }) => {
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

	return <StyledWrapper { ...props }>
		{children}
	</StyledWrapper>;
};

Service = React.memo(Service);
Service.defaultProps = {
};
Service.propTypes = {
};

export default Service;
