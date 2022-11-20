import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { fireSchema as actionBreadcrumbsSchema } from '@nest-datum-ui/components/Store/breadcrumbs/actions/schema.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Loader from '@nest-datum-ui/components/Loader';
import Link from '@nest-datum-ui/components/Link';

let Breadcrumbs = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const data = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'app', 'data' ]));
	const onClick = React.useCallback((e) => {
		e.preventDefault();

		const pathname = e.currentTarget.pathname;

		window.dispatchEvent(new CustomEvent('onBreadcrumbsChange', { 
			detail: {
				pathname,
			}, 
		}));
		navigate(pathname);
	}, [
		navigate,
	]);

	React.useEffect(() => () => {
		actionBreadcrumbsSchema()();
	}, [
	]);

	return <React.Fragment>
		<Loader visible={!Array.isArray(data)} />
		{Array.isArray(data)
			? <MuiBreadcrumbs separator='/'>
				{data.map((item, index) => {
					return (item.key === location.pathname)
						? <Typography key={item.key}>
							{item.text}
						</Typography>
						: <Button
							key={item.key}
							component={Link}
							to={item.key}
							onClick={onClick}
							color="primary"
							size="small"
							sx={{
								textTransform: 'none',
								minWidth: 'max-content',
							}}>
							<Typography>
								{item.text}
							</Typography>
						</Button>;
				})}
			</MuiBreadcrumbs>
			: <React.Fragment />}
	</React.Fragment>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
};
Breadcrumbs.propTypes = {
};

export default Breadcrumbs;
