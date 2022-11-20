import React from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'components/Link';

let Primary = () => {
	const urlParams = useParams();
	const urlPathname = window.location.pathname.substring(1);
	const activeFlags = [
		(urlPathname.indexOf(`${urlParams.serviceKey}/traffic`) === 0),
		(urlPathname.indexOf(`${urlParams.serviceKey}/error`) === 0),
		(urlPathname.indexOf(`${urlParams.serviceKey}/warning`) === 0),
		(urlPathname.indexOf(`${urlParams.serviceKey}/notification`) === 0),
		(urlPathname.indexOf(`${urlParams.serviceKey}/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	return <React.Fragment>
		<Tabs
			variant="scrollable"
			value={(tab >= 0)
				? tab
				: 0}
			onChange={onTab}>
			<Tab 
				label="Traffic"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/traffic`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'traffic',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Errors"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/error`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'error',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Warnings"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/warning`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'warning',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Notifications"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/notification`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'notification',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Настройки"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/settings`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'settings',
						sx: {
							textTransform: 'initial',
						},
					} } />
		</Tabs>
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
