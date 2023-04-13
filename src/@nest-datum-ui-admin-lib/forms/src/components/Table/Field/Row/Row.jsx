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
	name,
	description,
	dataTypeId,
	fieldStatusId,
	userId,
	isRequired,
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
			ssoUserList: {
				apiFullUrl: ssoUserListApiUrl,
			},
		},
		forms: {
			formsFieldStatusList: {
				apiFullUrl: formsFieldStatusListApiUrl,
			},
		},
		'data-type': { 
			dataTypeList: {
				apiFullUrl: dataTypeListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted} 
		isNotDelete={isNotDelete} 
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
			children: <React.Fragment key={1}>
				<TypographyTable 
					to={`${pageFullUrl}/${id}`} 
					isDeleted={isDeleted} 
					variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable 
					to={`${pageFullUrl}/${id}`} 
					isDeleted={isDeleted} 
					variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch key={3} apiUrl={dataTypeListApiUrl}>
				{dataTypeId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch 
				key={2} 
				apiUrl={formsFieldStatusListApiUrl}>
				{fieldStatusId}
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
