import React from 'react';
import { 
	Outlet,
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
	get as utilsHooksGet,
	set as utilsHooksSet,
} from '@nest-datum-ui/utils/hooks';

let Layout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { enqueueSnackbar } = useSnackbar();
	const [ navigateMemo ] = React.useState(() => navigate);
	const [ locationMemo ] = React.useState(() => location);
	const [ enqueueSnackbarMemo ] = React.useState(() => enqueueSnackbar);

	if (!utilsHooksGet('navigate')) {
		utilsHooksSet('navigate', navigateMemo);
	}
	if (!utilsHooksGet('location')) {
		utilsHooksSet('location', locationMemo);
	}
	if (!utilsHooksGet('snackbar')) {
		utilsHooksSet('snackbar', enqueueSnackbarMemo);
	}

	return <React.Fragment>
		<Outlet />
	</React.Fragment>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
