import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterTraffic from '@nest-datum-ui/logs/components/Form/Traffic/Filter';
import TableTraffic from '@nest-datum-ui/logs/components/Table/Traffic';
import DialogTrafficDrop from '@nest-datum-ui/logs/components/Dialog/Traffic/Drop';
import Link from '@nest-datum-ui/components/Link';

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
		<Box pb={2}>
			<Button
				disableElevation
				variant="contained"
				color="secondary"
				size="small"
				startIcon={<AddIcon />}
				component={Link}
				to={`/logs/traffic/0`}>
				Create
			</Button>
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
