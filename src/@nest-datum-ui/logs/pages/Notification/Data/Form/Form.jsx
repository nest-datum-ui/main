import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormNotification from '@nest-datum-ui/logs/components/Form/Notification';
import DialogNotificationDrop from '@nest-datum-ui/logs/components/Dialog/Notification/Drop';

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
			key: `/logs/notification`,
			text: 'Notifications',
		}, {
			key: `/logs/notification/${entityId}`,
			text: (entityId === '0')
				? 'Create new notification log'
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
					? 'Create new notification log'
					: <React.Fragment>
						Edit notification log <b
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
		<FormNotification storeName={entityId} />
		<DialogNotificationDrop storeName={entityId} />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
