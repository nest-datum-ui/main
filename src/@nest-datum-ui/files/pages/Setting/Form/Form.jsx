import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormSetting from 'components/Form/Setting';
import DialogSettingDrop from 'components/Dialog/Setting/Drop';

let Form = () => {
	const { 
		serviceKey,
		entityId, 
	} = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
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
			}, {
				key: `/${serviceKey}/settings/${entityId}`,
				text: (entityId === '0')
					? 'Create new setting'
					: <span
						style={{
							textDecoration: isDeleted
								? 'line-through'
								: 'initial',
						}}>
						{entityId}
					</span>,
			}])();
		}
	}, [
		serviceName,
		serviceKey,
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				{(entityId === '0')
					? 'Добавить настройку'
					: <React.Fragment>
						Редактировать настройку <b
							style={{
								textDecoration: isDeleted
									? 'line-through'
									: 'initial',
							}}>
							{entityId}
						</b>
					</React.Fragment>}
			</Typography>
		</Box>
		<FormSetting
			withAccessToken
			storeName="serviceSettingsList"
			url={gateway}
			path="setting" />
		<DialogSettingDrop
			withAccessToken
			storeName="serviceSettingsList"
			url={gateway}
			path="setting" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
