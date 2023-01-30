import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fireSchema as actionBreadcrumbsSchema } from '@nest-datum-ui/components/Store/breadcrumbs/actions/schema.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Loader from '@nest-datum-ui/components/Loader';
import ButtonLink from '@nest-datum-ui/components/Button/Link';
import handlersSwitchLink from './handlers/switchLink.js';

let Breadcrumbs = () => {
	const { pathname } = useLocation();
	const data = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'app', 'data' ]));
	const loader = !Array.isArray(data);
	const onClick = React.useCallback(handlersSwitchLink, []);

	React.useEffect(() => () => actionBreadcrumbsSchema()(), [
	]);

	return <React.Fragment>
		<Loader visible={loader} />
		{!loader
			? <MuiBreadcrumbs separator='/'>
				{data.map((item, index) => {
					return (item.key === pathname)
						? <Typography key={item.key}>
							{item.text}
						</Typography>
						: <Button
							key={item.key}
							component={ButtonLink}
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
