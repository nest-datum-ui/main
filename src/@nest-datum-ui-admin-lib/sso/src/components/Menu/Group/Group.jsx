import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		sso: { 
			ssoUser,
			ssoRole,
			ssoAccess,
			ssoSetting,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isUsersGroup = pathname.indexOf(ssoUser.pageFullUrl) === 0;
	const isUsersGroupOptions = pathname.indexOf(`${ssoUser.pageFullUrl}/options`) === 0;
	const isUsersGroupStatuses = pathname.indexOf(`${ssoUser.pageFullUrl}/statuses`) === 0;
	const isRolesGroup = pathname.indexOf(ssoRole.pageFullUrl) === 0;
	const isRolesGroupOptions = pathname.indexOf(`${ssoRole.pageFullUrl}/options`) === 0;
	const isRolesGroupStatuses = pathname.indexOf(`${ssoRole.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(ssoAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${ssoAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${ssoAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(ssoSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isUsersGroup
					? [{
						flag: (pathname.length > ssoUser.pageFullUrl.length && (isUsersGroupOptions || isUsersGroupStatuses)),
						to: ssoUser.pageFullUrl,
					}]
					: (isRolesGroup
						? [{
							flag: (pathname.length > ssoRole.pageFullUrl.length && (isRolesGroupOptions || isRolesGroupStatuses)),
							to: ssoRole.pageFullUrl,
						}]
						: (isAccessesGroup
							? [{
								flag: (pathname.length > ssoAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: ssoAccess.pageFullUrl,
							}]
							: [])),
			}, {
				text: 'Options',
				check: isUsersGroup
					? [{
						flag: !isUsersGroupOptions,
						to: `${ssoUser.pageFullUrl}/options`,
					}]
					: (isRolesGroup
						? [{
							flag: !isRolesGroupOptions,
							to: `${ssoRole.pageFullUrl}/options`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${ssoAccess.pageFullUrl}/options`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isUsersGroup
					? [{
						flag: !isUsersGroupStatuses,
						to: `${ssoUser.pageFullUrl}/statuses`,
					}]
					: (isRolesGroup
						? [{
							flag: !isRolesGroupStatuses,
							to: `${ssoRole.pageFullUrl}/statuses`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${ssoAccess.pageFullUrl}/statuses`,
							}]
							: [])),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
