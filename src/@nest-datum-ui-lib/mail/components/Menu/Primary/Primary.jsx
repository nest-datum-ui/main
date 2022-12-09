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
		(urlPathname.indexOf(`mail/letter`) === 0),
		(urlPathname.indexOf(`mail/template`) === 0),
		(urlPathname.indexOf(`mail/report`) === 0),
		(urlPathname.indexOf(`mail/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/mail`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/mail`) {
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
				label="Letters"
				{ ...(urlPathname.indexOf(`mail/letter`) === 0
					|| pathname === `/mail`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'letter',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Templates"
				{ ...(urlPathname.indexOf(`mail/template`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: Link,
						to: 'template',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Reports"
				{ ...(urlPathname.indexOf(`mail/report`) === 0)
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
				{ ...(urlPathname.indexOf(`mail/settings`) === 0)
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
			py={tab <= 1
				? 2
				: 0}>
		{(tab <= 0)
			? <ButtonGroup
				disableElevation
				variant="outlined"
				color="primary"
				size="small">
				<Button 
					{ ...!((urlPathname.indexOf(`mail/letter/options`) === 0)
						|| (urlPathname.indexOf(`mail/letter/statuses`) === 0)
						|| (urlPathname.indexOf(`mail/letter/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/mail/letter`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`mail/letter/options`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/mail/letter/options`,
						} }>
					Options
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`mail/letter/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: Link,
							to: `/mail/letter/statuses`,
						} }>
					Statuses
				</Button>
			</ButtonGroup>
			: ((tab === 1)
				? <ButtonGroup
					disableElevation
					variant="outlined"
					color="primary"
					size="small">
					<Button 
						{ ...!((urlPathname.indexOf(`mail/template/options`) === 0)
							|| (urlPathname.indexOf(`mail/template/statuses`) === 0)
							|| (urlPathname.indexOf(`mail/template/routes`) === 0))
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/mail/template`,
							} }>
						Data
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`mail/template/options`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/mail/template/options`,
							} }>
						Options
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`mail/template/statuses`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: Link,
								to: `/mail/template/statuses`,
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
