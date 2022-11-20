import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormSettingFilter from 'components/Form/Setting/Filter';
import TableDataSetting from 'components/Table/Setting';
import DialogSettingDrop from 'components/Dialog/Setting/Drop';
import Link from 'components/Link';

let List = () => {
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const serviceName = (service || {}).name;
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;

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
				key: `/${serviceKey}/settings`,
				text: 'Settings',
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
				Список настроек
			</Typography>
		</Box>
		<Box py={2}>
			<Button
				disableElevation
				variant="contained"
				color="secondary"
				size="small"
				startIcon={<AddIcon />}
				component={Link}
				to={`/${serviceKey}/settings/0`}>
				Добавить
			</Button>
		</Box>
		<FormSettingFilter storeName="logsSettingsList" />
		<TableDataSetting
			withAccessToken
			storeName="logsSettingsList"
			url={gateway}
			path="setting" />
		<DialogSettingDrop
			withAccessToken
			storeName="logsSettingsList"
			url={gateway}
			path="setting" />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
