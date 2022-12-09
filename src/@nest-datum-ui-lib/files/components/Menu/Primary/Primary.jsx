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
		(urlPathname.indexOf(`files/manage`) === 0),
		(urlPathname.indexOf(`files/system`) === 0),
		(urlPathname.indexOf(`files/provider`) === 0),
		(urlPathname.indexOf(`files/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/files`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/files`) {
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
				label="File Manager"
				{ ...(urlPathname.indexOf(`files/manage`) === 0
					|| pathname === `/files`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'manage',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="File systems"
				{ ...(urlPathname.indexOf(`files/system`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'system',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="System providers"
				{ ...(urlPathname.indexOf(`files/provider`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'provider',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Settings"
				{ ...(urlPathname.indexOf(`files/settings`) === 0)
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
			py={(tab >= 1 && tab <= 2)
				? 2
				: 0}>
		{(tab === 1)
			? <ButtonGroup
				disableElevation
				variant="outlined"
				color="primary"
				size="small">
				<Button 
					{ ...!((urlPathname.indexOf(`files/system/options`) === 0)
						|| (urlPathname.indexOf(`files/system/statuses`) === 0)
						|| (urlPathname.indexOf(`files/system/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/files/system`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`files/system/options`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/files/system/options`,
						} }>
					Options
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`files/system/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/files/system/statuses`,
						} }>
					Statuses
				</Button>
			</ButtonGroup>
			: ((tab === 2)
				? <ButtonGroup
					disableElevation
					variant="outlined"
					color="primary"
					size="small">
					<Button 
						{ ...!((urlPathname.indexOf(`files/provider/options`) === 0)
							|| (urlPathname.indexOf(`files/provider/statuses`) === 0)
							|| (urlPathname.indexOf(`files/provider/routes`) === 0))
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/files/provider`,
							} }>
						Data
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`files/provider/options`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/files/provider/options`,
							} }>
						Options
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`files/provider/statuses`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/files/provider/statuses`,
							} }>
						Statuses
					</Button>
				</ButtonGroup>
				: <React.Fragment />)}
		</Box>
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
