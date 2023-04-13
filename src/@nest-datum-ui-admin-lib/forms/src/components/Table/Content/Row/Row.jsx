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
	formId,
	contentStatusId,
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
			formsContentStatusList: {
				apiFullUrl: formsContentStatusListApiUrl,
			},
			formsFormList: {
				apiFullUrl: formsFormListApiUrl,
			}
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
			children: <TypographyFetch 
				key={2} 
				apiUrl={formsFormListApiUrl}>
				{formId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch 
				key={3} 
				apiUrl={formsContentStatusListApiUrl}>
				{contentStatusId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch 
				key={4}
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
