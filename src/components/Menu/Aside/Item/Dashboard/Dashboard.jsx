import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ButtonLink from '@nest-datum-ui/Button/Link';

let Dashboard = ({ onClick }) => {
	const { pathname } = useLocation();
	const onClickWrapper = React.useCallback((e) => {
		onClick(e, { title: 'Dashboard', url: `/${process.env.ROUTE_AUTHED}` });
	}, [
		onClick,
	]);

	return <ListItem 
		disablePadding
		onClick={onClickWrapper}
		{ ...(pathname === `/${process.env.ROUTE_AUTHED}`)
			? {	className: 'active' }
			: {
				component: ButtonLink,
				to: `/${process.env.ROUTE_AUTHED}`,
			} }>
		<ListItemButton>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText>
				<Typography color="initial">
					Dashboard
				</Typography>
			</ListItemText>
		</ListItemButton>
	</ListItem>;
};

Dashboard = React.memo(Dashboard);
Dashboard.defaultProps = {
	onClick: () => {},
};
Dashboard.propTypes = {
	onClick: PropTypes.func,
};

export default Dashboard;
