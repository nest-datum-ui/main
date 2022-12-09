import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterErr from '@nest-datum-ui-lib/logs/components/Form/Err/Filter';
import TableErr from '@nest-datum-ui-lib/logs/components/Table/Err';
import DialogErrDrop from '@nest-datum-ui-lib/logs/components/Dialog/Err/Drop';
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
			key: '/logs/err',
			text: 'Errors',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				Errors list
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
				to={`/logs/err/0`}>
				Create
			</Button>
		</Box>
		<FormFilterErr />
		<TableErr storeName="logsErrList" />
		<DialogErrDrop storeName="logsErrList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
