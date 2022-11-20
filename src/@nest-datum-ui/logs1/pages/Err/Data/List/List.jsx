import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterErr from '@nest-datum-ui/logs/components/Form/Err/Filter';
import TableDataErr from '@nest-datum-ui/logs/components/Table/Err';
import DialogErrDrop from '@nest-datum-ui/logs/components/Dialog/Err/Drop';

let List = () => {
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const serviceName = (service || {}).name;

	React.useEffect(() => {
		if (serviceName
			&& serviceKey) {
			actionBreadcrumbsListSet('app', [{
				key: '/',
				text: '...',
			}, {
				key: serviceKey,
				text: serviceName,
			}, {
				key: `/${serviceKey}/error`,
				text: 'Errors',
			}])();
		}
	}, [
		serviceName,
		serviceKey,
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				Errors
			</Typography>
		</Box>
		<FormFilterErr />
		<TableDataErr />
		<DialogErrDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
