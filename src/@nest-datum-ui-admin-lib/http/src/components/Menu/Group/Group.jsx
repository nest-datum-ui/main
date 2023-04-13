import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		http: { 
			httpAccess,
			httpSetting,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isAccessesGroup = pathname.indexOf(httpAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${httpAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${httpAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(httpSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: (isAccessesGroup
					? [{
						flag: (pathname.length > httpAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
						to: httpAccess.pageFullUrl,
					}]
					: []),
			}, {
				text: 'Options',
				check: (isAccessesGroup
					? [{
						flag: !isAccessesGroupOptions,
						to: `${httpAccess.pageFullUrl}/options`,
					}]
					: []),
			}, {
				text: 'Statuses',
				check: (isAccessesGroup
					? [{
						flag: !isAccessesGroupStatuses,
						to: `${httpAccess.pageFullUrl}/statuses`,
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
