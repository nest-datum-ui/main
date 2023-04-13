import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		'web-socket': { 
			webSocketAccess,
			webSocketSetting,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isAccessesGroup = pathname.indexOf(webSocketAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${webSocketAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${webSocketAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(webSocketSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: (isAccessesGroup
					? [{
						flag: (pathname.length > webSocketAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
						to: webSocketAccess.pageFullUrl,
					}]
					: []),
			}, {
				text: 'Options',
				check: (isAccessesGroup
					? [{
						flag: !isAccessesGroupOptions,
						to: `${webSocketAccess.pageFullUrl}/options`,
					}]
					: []),
			}, {
				text: 'Statuses',
				check: (isAccessesGroup
					? [{
						flag: !isAccessesGroupStatuses,
						to: `${webSocketAccess.pageFullUrl}/statuses`,
					}]
					: []),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
