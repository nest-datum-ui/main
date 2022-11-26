import React from 'react';
import { useSelector } from 'react-redux';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { fireListClear as actionBreadcrumbsListClear } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Store from '@nest-datum-ui/components/Store';

let Breadcrumbs = () => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'loader' ]));
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'filesManageList', 'data' ])) ?? [];
	const onFolder = React.useCallback((id, index) => (e) => {
		const breadcrumbs = (Store()
			.getState()['breadcrumbs']
			.list
			.filesManageList || {})
			.data || [];

		actionBreadcrumbsListSet('filesManageList', [ ...breadcrumbs.slice(0, index) ])();
	}, [
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
};
Breadcrumbs.propTypes = {
};

export default Breadcrumbs;
