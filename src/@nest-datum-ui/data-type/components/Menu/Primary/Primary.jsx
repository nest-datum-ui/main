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
		(urlPathname.indexOf(`data-type/type`) === 0),
		(urlPathname.indexOf(`data-type/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/data-type`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/data-type`) {
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
				label="Types"
				{ ...(urlPathname.indexOf(`data-type/type`) === 0
					|| pathname === `/data-type`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'type',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Settings"
				{ ...(urlPathname.indexOf(`data-type/settings`) === 0)
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
					{ ...!((urlPathname.indexOf(`data-type/type/options`) === 0)
						|| (urlPathname.indexOf(`data-type/type/statuses`) === 0)
						|| (urlPathname.indexOf(`data-type/type/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/data-type/type`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`data-type/type/options`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/data-type/type/options`,
						} }>
					Options
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`data-type/type/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/data-type/type/statuses`,
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
