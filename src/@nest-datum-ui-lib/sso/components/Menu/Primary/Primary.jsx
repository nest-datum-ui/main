import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Primary = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const urlPathname = pathname.substring(1);
	const activeFlags = [
		(urlPathname.indexOf(`sso/user`) === 0),
		(urlPathname.indexOf(`sso/role`) === 0),
		(urlPathname.indexOf(`sso/access`) === 0),
		(urlPathname.indexOf(`sso/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/sso`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/sso`) {
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
				label="Users"
				{ ...(urlPathname.indexOf(`sso/user`) === 0
					|| pathname === `/sso`)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'user',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Roles"
				{ ...(urlPathname.indexOf(`sso/role`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'role',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Accesses"
				{ ...(urlPathname.indexOf(`sso/access`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'access',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Settings"
				{ ...(urlPathname.indexOf(`sso/settings`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'settings',
						sx: {
							textTransform: 'initial',
						},
					} } />
		</Tabs>
		<Box 
			py={tab <= 2
				? 2
				: 0}>
		{(tab <= 0)
			? <ButtonGroup
				disableElevation
				variant="outlined"
				color="primary"
				size="small">
				<Button 
					{ ...!((urlPathname.indexOf(`sso/user/options`) === 0)
						|| (urlPathname.indexOf(`sso/user/statuses`) === 0)
						|| (urlPathname.indexOf(`sso/user/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/sso/user`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`sso/user/options`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/sso/user/options`,
						} }>
					Options
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`sso/user/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/sso/user/statuses`,
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
						{ ...!((urlPathname.indexOf(`sso/role/options`) === 0)
							|| (urlPathname.indexOf(`sso/role/statuses`) === 0)
							|| (urlPathname.indexOf(`sso/role/routes`) === 0))
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/sso/role`,
							} }>
						Data
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`sso/role/options`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/sso/role/options`,
							} }>
						Options
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`sso/role/statuses`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/sso/role/statuses`,
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
							{ ...!((urlPathname.indexOf(`sso/access/options`) === 0)
								|| (urlPathname.indexOf(`sso/access/statuses`) === 0)
								|| (urlPathname.indexOf(`sso/access/routes`) === 0))
								? { 
									variant: 'contained',
									sx: {
										pointerEvents: 'none',
									} 
								}
								: {
									component: ButtonLink,
									to: `/sso/access`,
								} }>
							Data
						</Button>
						<Button
							{ ...(urlPathname.indexOf(`sso/access/options`) === 0)
								? { 
									variant: 'contained',
									sx: {
										pointerEvents: 'none',
									} 
								}
								: {
									component: ButtonLink,
									to: `/sso/access/options`,
								} }>
							Options
						</Button>
						<Button
							{ ...(urlPathname.indexOf(`sso/access/statuses`) === 0)
								? { 
									variant: 'contained',
									sx: {
										pointerEvents: 'none',
									} 
								}
								: {
									component: ButtonLink,
									to: `/sso/access/statuses`,
								} }>
							Statuses
						</Button>
					</ButtonGroup>
					: <React.Fragment />))}
		</Box>
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
