import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	login,
	email,
	roleId,
	userStatusId,
	emailVerifiedAt,
	isDeleted,
	isNotDelete,
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
			ssoUserStatusList: {
				apiFullUrl: ssoUserStatusListApiUrl, 
			},
			ssoRoleList: {
				apiFullUrl: ssoRoleListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);

	return <StyledWrapper id={id} isDeleted={isDeleted} isNotDelete={isNotDelete} createdAt={createdAt} updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable key={0} to={`${pageFullUrl}/${id}`} isDeleted={isDeleted}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="h6">
					{login}
				</TypographyTable>
				<div />
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="subtitle1">
					{email}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch key={2} apiUrl={ssoRoleListApiUrl}>
				{roleId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch key={2} apiUrl={ssoUserStatusListApiUrl}>
				{userStatusId}
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
