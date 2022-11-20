import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableServ from '@nest-datum-ui/registry/components/Table/Serv';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'registry',
			text: 'Registry',
		}, {
			key: '/registry/serv',
			text: 'Services',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box
			pt={1} 
			pb={2}>
			<Typography
				component="div"
				variant="h5">
				Services list
			</Typography>
		</Box>
		<TableServ />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
