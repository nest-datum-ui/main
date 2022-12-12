import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from '@nest-datum-ui/components/Link';

let Primary = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const urlPathname = pathname.substring(1);
	const activeFlags = [
		(urlPathname.indexOf(`cv/report`) === 0),
		(urlPathname.indexOf(`cv/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/cv`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/cv`) {
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
				label="Reports"
				{ ...(urlPathname.indexOf(`cv/report`) === 0
					|| pathname === `/cv`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'report',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Settings"
				{ ...(urlPathname.indexOf(`cv/settings`) === 0)
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
		<Box 
			py={tab === 0
				? 2
				: 0}>
		{(tab <= 0)
			? <ButtonGroup
				disableElevation
				variant="outlined"
				color="primary"
				size="small">
				<Button 
					{ ...!((urlPathname.indexOf(`cv/report/options`) === 0)
						|| (urlPathname.indexOf(`cv/report/statuses`) === 0)
						|| (urlPathname.indexOf(`cv/report/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/cv/report`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`cv/report/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/cv/report/statuses`,
						} }>
					Statuses
				</Button>
			</ButtonGroup>
			: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
