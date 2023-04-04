import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import TypographyTable from 'components/Typography/Table';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	name,
	description,
	accessStatusId,
	userId,
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
		'data-type': { 
			dataTypeAccessStatusList: {
				apiFullUrl: dataTypeAccessStatusListApiUrl,
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
			children: <TypographyTable key={0} to={`${pageFullUrl}/${id}`} isDeleted={isDeleted}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch key={2} apiUrl={dataTypeAccessStatusListApiUrl}>
				{accessStatusId}
			</TypographyFetch>, 
		}, { 
			children: <TypographyFetch key={3} apiUrl={ssoUserListApiUrl} label="login">
				{userId}
			</TypographyFetch>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
	bulkDeletion: false,
	onCheck: () => {},
};
Row.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	accessStatusId: PropTypes.string,
	userId: PropTypes.string,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
};

export default Row;
