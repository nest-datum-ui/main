import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterTemplate from '@nest-datum-ui/mail/components/Form/Template/Filter';
import TableTemplate from '@nest-datum-ui/mail/components/Table/Template';
import DialogTemplateDrop from '@nest-datum-ui/mail/components/Dialog/Template/Drop';
import Link from '@nest-datum-ui/components/Link';

let List = () => {
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'mail',
			text: 'Mail',
		}, {
			key: '/mail/template',
			text: 'Templates',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Template list
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
				to={`/mail/template/0`}>
				Create
			</Button>
		</Box>
		<FormFilterTemplate />
		<TableTemplate />
		<DialogTemplateDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
