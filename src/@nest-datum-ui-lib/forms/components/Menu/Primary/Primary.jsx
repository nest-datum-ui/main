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
		(urlPathname.indexOf(`forms/form`) === 0),
		(urlPathname.indexOf(`forms/field`) === 0),
		(urlPathname.indexOf(`forms/content`) === 0),
		(urlPathname.indexOf(`forms/settings`) === 0),
	];
	const [ tab, setTab ] = React.useState(() => (pathname === `/forms`)
		? 0
		: activeFlags.indexOf(true));
	const onTab = React.useCallback((e, newValue) => {
		setTab(newValue);
	}, [
		setTab,
	]);

	React.useEffect(() => {
		if (pathname === `/forms`) {
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
				label="Forms"
				{ ...(urlPathname.indexOf(`forms/form`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'form',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Fields"
				{ ...(urlPathname.indexOf(`forms/field`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'field',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Content"
				{ ...(urlPathname.indexOf(`forms/content`) === 0)
					? {
						sx: {
							textTransform: 'initial',
							pointerEvents: 'none',
						}
					}
					: {
						component: ButtonLink,
						to: 'content',
						sx: {
							textTransform: 'initial',
						},
					} } />
			<Tab 
				label="Settings"
				{ ...(urlPathname.indexOf(`forms/settings`) === 0)
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
					{ ...!((urlPathname.indexOf(`forms/form/options`) === 0)
						|| (urlPathname.indexOf(`forms/form/statuses`) === 0)
						|| (urlPathname.indexOf(`forms/form/routes`) === 0))
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/forms/form`,
						} }>
					Data
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`forms/form/options`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/forms/form/options`,
						} }>
					Options
				</Button>
				<Button
					{ ...(urlPathname.indexOf(`forms/form/statuses`) === 0)
						? { 
							variant: 'contained',
							sx: {
								pointerEvents: 'none',
							} 
						}
						: {
							component: ButtonLink,
							to: `/forms/form/statuses`,
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
						{ ...!((urlPathname.indexOf(`forms/field/options`) === 0)
							|| (urlPathname.indexOf(`forms/field/statuses`) === 0)
							|| (urlPathname.indexOf(`forms/field/routes`) === 0))
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/forms/field`,
							} }>
						Data
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`forms/field/options`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/forms/field/options`,
							} }>
						Options
					</Button>
					<Button
						{ ...(urlPathname.indexOf(`forms/field/statuses`) === 0)
							? { 
								variant: 'contained',
								sx: {
									pointerEvents: 'none',
								} 
							}
							: {
								component: ButtonLink,
								to: `/forms/field/statuses`,
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
							{ ...!((urlPathname.indexOf(`forms/content/options`) === 0)
								|| (urlPathname.indexOf(`forms/content/statuses`) === 0)
								|| (urlPathname.indexOf(`forms/content/routes`) === 0))
								? { 
									variant: 'contained',
									sx: {
										pointerEvents: 'none',
									} 
								}
								: {
									component: ButtonLink,
									to: `/forms/content`,
								} }>
							Data
						</Button>
						<Button
							{ ...(urlPathname.indexOf(`forms/content/statuses`) === 0)
								? { 
									variant: 'contained',
									sx: {
										pointerEvents: 'none',
									} 
								}
								: {
									component: ButtonLink,
									to: `/forms/content/statuses`,
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
