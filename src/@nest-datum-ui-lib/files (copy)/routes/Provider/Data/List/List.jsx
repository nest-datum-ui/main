import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormProviderFilter from '@nest-datum-ui-lib/files/components/Form/Provider/Filter';
import TableProvider from '@nest-datum-ui-lib/files/components/Table/Provider';
import DialogProviderDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Drop';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'files',
			text: 'Files',
		}, {
			key: '/files/provider',
			text: 'System providers',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				System providers list
			</Typography>
		</Box>
		<Box pb={2}>
			<Button
				disableElevation
				variant="contained"
				color="secondary"
				size="small"
				startIcon={<AddIcon />}
				component={ButtonLink}
				to={`/files/provider/0`}>
				Create
			</Button>
		</Box>
		<FormProviderFilter />
		<TableProvider storeName="filesProviderList" />
		<DialogProviderDrop storeName="filesProviderList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
