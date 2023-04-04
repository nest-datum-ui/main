import React from 'react';
import { 
	Outlet,
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
	getUrlHook,
	setUrlHook,
	getSnackbarHook,
	setSnackbarHook,
} from '@nest-datum-ui/Store';

let Layout = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { enqueueSnackbar } = useSnackbar();
	const [ navigateMemo ] = React.useState(() => navigate);
	const [ locationMemo ] = React.useState(() => location);
	const [ enqueueSnackbarMemo ] = React.useState(() => enqueueSnackbar);

	if (!getUrlHook('navigate')) {
		setUrlHook('navigate', navigateMemo);
	}
	if (!getUrlHook('location')) {
		setUrlHook('location', locationMemo);
	}
	if (!getSnackbarHook('snackbar')) {
		setSnackbarHook('snackbar', enqueueSnackbarMemo);
	}

	return <Outlet { ...props } />;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
