import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterTraffic from '@nest-datum-ui/logs/components/Form/Traffic/Filter';
import TableDataTraffic from '@nest-datum-ui/logs/components/Table/Traffic';
import DialogTrafficDrop from '@nest-datum-ui/logs/components/Dialog/Traffic/Drop';

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
				key: `/${serviceKey}/traffic`,
				text: serviceName,
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
				Трафик
			</Typography>
		</Box>
		<FormFilterTraffic />
		<TableDataTraffic />
		<DialogTrafficDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
