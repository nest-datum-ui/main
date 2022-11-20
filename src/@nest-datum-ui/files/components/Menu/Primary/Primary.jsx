import React from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'components/Link';

let Primary = () => {
	const urlParams = useParams();
	const urlPathname = window.location.pathname.substring(1);
	const activeFlags = [
		(urlPathname.indexOf(`${urlParams.serviceKey}/storage`) === 0),
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
				label="Файловая система"
				{ ...(urlPathname.indexOf(`${urlParams.serviceKey}/storage`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'storage',
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
