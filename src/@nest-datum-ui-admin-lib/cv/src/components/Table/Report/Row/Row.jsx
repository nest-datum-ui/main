import React from 'react';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	userId,
	fileId,
	sourceId,
	reportStatusId,
	isDeleted,
	createdAt,
	updatedAt,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				parentName,
			}, 
		},
		sso: {
			ssoUserList: {
				apiFullUrl: ssoUserListApiUrl,
			},
		},
		cv: {
			cvReportStatusList: {
				apiFullUrl: cvReportStatusListApiUrl,
			},
		},
		// files: {
		// 	filesManagerList: {
		// 		filesApiUrl: filesManagerListApiUrl,
		// 	},
		// },
	} = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted}  
		createdAt={createdAt} 
		updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable 
				key={0} 
				to={`${pageFullUrl}/${id}`} 
				isDeleted={isDeleted}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <TypographyTable key={1}>
				{fileId}
			</TypographyTable>, 
		}, { 
			children: <TypographyFetch 
				key={2} 
				apiUrl={cvReportStatusListApiUrl}>
				{reportStatusId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch 
				key={3}
				apiUrl={ssoUserListApiUrl} 
				label="login">
				{userId}
			</TypographyFetch>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
};

export default Row;
