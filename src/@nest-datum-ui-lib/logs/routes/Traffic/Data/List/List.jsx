import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterTraffic from '@nest-datum-ui-lib/logs/components/Form/Traffic/Filter';
import TableTraffic from '@nest-datum-ui-lib/logs/components/Table/Traffic';
import DialogTrafficDrop from '@nest-datum-ui-lib/logs/components/Dialog/Traffic/Drop';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'logs',
			text: 'Logs',
		}, {
			key: '/logs/traffic',
			text: 'Traffic logs',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				Traffic logs list
			</Typography>
		</Box>
		<FormFilterTraffic />
		<TableTraffic storeName="logsTrafficList" />
		<DialogTrafficDrop storeName="logsTrafficList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
