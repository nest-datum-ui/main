import React from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@nest-datum-ui/components/Link';

let Primary = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const urlPathname = pathname.substring(1);
	const activeFlags = [
		(urlPathname.indexOf(`logs/err`) === 0),
		(urlPathname.indexOf(`logs/warning`) === 0),
		(urlPathname.indexOf(`logs/notification`) === 0),
		(urlPathname.indexOf(`logs/traffic`) === 0),
		(urlPathname.indexOf(`logs/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/logs`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/logs`) {
			setTab(0);
		}
	}, [
		pathname,
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
				label="Errors"
				{ ...(urlPathname.indexOf(`logs/err`) === 0
					|| pathname === `/logs`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'err',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Warnings"
				{ ...(urlPathname.indexOf(`logs/warning`) === 0)
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
				{ ...(urlPathname.indexOf(`logs/notification`) === 0)
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
				label="Traffic"
				{ ...(urlPathname.indexOf(`logs/traffic`) === 0)
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
				label="Settings"
				{ ...(urlPathname.indexOf(`logs/settings`) === 0)
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
