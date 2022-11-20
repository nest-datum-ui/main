import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormFilterWarning from '@nest-datum-ui/logs/components/Form/Warning/Filter';
import TableDataWarning from '@nest-datum-ui/logs/components/Table/Warning';
import DialogWarningDrop from '@nest-datum-ui/logs/components/Dialog/Warning/Drop';

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
				key: `/${serviceKey}/warning`,
				text: 'Warnings',
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
				Warnings
			</Typography>
		</Box>
		<FormFilterWarning />
		<TableDataWarning />
		<DialogWarningDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
