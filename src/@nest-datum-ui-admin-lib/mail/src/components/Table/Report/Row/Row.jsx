import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	action,
	content,
	reportStatusId,
	userId,
	createdAt,
	updatedAt,
}) => {
	const { 
		sso: {
			ssoUserList: {
				apiFullUrl: ssoUserListApiUrl,
			},
		},
		mail: {
			mailReportStatusList: {
				apiFullUrl: mailReportStatusListApiUrl,
			},
		},
	} = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id}
		createdAt={createdAt} 
		updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable key={0}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable variant="h6">
					{action}
				</TypographyTable>
				<div />
				<TypographyTable variant="subtitle1">
					{content}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch 
				key={2} 
				apiUrl={mailReportStatusListApiUrl}>
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
