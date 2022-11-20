import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormSetting from '@nest-datum-ui/components/Form/Setting';
import DialogSettingDrop from '@nest-datum-ui/components/Dialog/Setting/Drop';

let Form = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'logs',
			text: 'Logs',
		}, {
			key: `/logs/settings`,
			text: 'Settings',
		}, {
			key: `/logs/settings/${entityId}`,
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
	}, [
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box py={2}>
			<Typography
				component="div"
				variant="h5">
				{(entityId === '0')
					? 'Add setting'
					: <React.Fragment>
						Edit setting <b
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
			storeName="logsSettingsList"
			url={process.env.SERVICE_LOGS}
			path="setting" />
		<DialogSettingDrop
			withAccessToken
			storeName="logsSettingsList"
			url={process.env.SERVICE_LOGS}
			path="setting" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
