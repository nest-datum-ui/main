import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterType from '@nest-datum-ui/data-type/components/Form/Type/Filter';
import TableType from '@nest-datum-ui/data-type/components/Table/Type';
import DialogTypeDrop from '@nest-datum-ui/data-type/components/Dialog/Type/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'data-type',
			text: 'Data types',
		}, {
			key: '/data-type/type',
			text: 'Types',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Types list
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
				to={`/data-type/type/0`}>
				Create
			</Button>
		</Box>
		<FormFilterType />
		<TableType storeName="dataTypeTypeList" />
		<DialogTypeDrop storeName="dataTypeTypeList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
