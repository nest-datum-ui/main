import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormFilterLetter from '@nest-datum-ui/mail/components/Form/Letter/Filter';
import TableLetter from '@nest-datum-ui/mail/components/Table/Letter';
import DialogLetterDrop from '@nest-datum-ui/mail/components/Dialog/Letter/Drop';
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
			key: '/mail/letter',
			text: 'Letters',
		}])();
	}, [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				Letter list
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
				to={`/mail/letter/0`}>
				Create
			</Button>
		</Box>
		<FormFilterLetter />
		<TableLetter />
		<DialogLetterDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
