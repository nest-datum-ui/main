import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListClear as actionBreadcrumbsListClear } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/clear.js';
import { FILES_PATH_SYSTEM } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

let Breadcrumbs = ({ onClick }) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM, 'loader' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ])) ?? [];
	const onFolder = React.useCallback((id, index) => (e) => onClick(e, { id, index }), [
		onClick,
	]);

	React.useEffect(() => () => {
		actionBreadcrumbsListClear('filesManageList')();
	}, [
	]);

	return <React.Fragment>
		<MuiBreadcrumbs separator='/'>
			{breadcrumbs.map((item, index) => {
				return (breadcrumbs.length - 1 === index || breadcrumbs.length === 0)
					? <Typography key={index}>
						{item.text}
					</Typography>
					: <Button
						key={index}
						disabled={loader}
						onClick={onFolder(item.id, index + 1)}
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
	</React.Fragment>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
	onClick: (() => {}),
};
Breadcrumbs.propTypes = {
	onClick: PropTypes.func,
};

export default Breadcrumbs;
