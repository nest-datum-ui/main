import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormStatus from '@nest-datum-ui/components/Form/Status';
import DialogStatusDrop from '@nest-datum-ui/components/Dialog/Status/Drop';

let Form = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'cv',
			text: 'CV',
		}, {
			key: `/cv/report`,
			text: 'Reports',
		}, {
			key: `/cv/report/statuses`,
			text: 'Statuses',
		}, {
			key: `/cv/report/statuses/${entityId}`,
			text: (entityId === '0')
				? 'Create new status'
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
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				{(entityId === '0')
					? 'Add status'
					: <React.Fragment>
						Edit status <b
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
		<FormStatus
			withAccessToken
			storeName="cvReportStatusesList"
			url={process.env.SERVICE_CV}
			path="report-status" />
		<DialogStatusDrop
			withAccessToken
			storeName="cvReportStatusesList"
			url={process.env.SERVICE_CV}
			path="report-status" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
