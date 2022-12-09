import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterContent from '@nest-datum-ui-lib/forms/components/Form/Content/Filter';
import TableContent from '@nest-datum-ui-lib/forms/components/Table/Content';
import DialogContentDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'forms',
			text: 'Forms',
		}, {
			key: '/forms/content',
			text: 'Form content',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Form content list
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
				to={`/forms/Content/0`}>
				Create
			</Button>
		</Box>
		<FormFilterContent />
		<TableContent storeName="formsContentList" />
		<DialogContentDrop storeName="formsContentList" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
