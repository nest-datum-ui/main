import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		'data-type': { 
			dataTypeAccess,
			dataTypeSetting,
			dataType,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isTypesGroup = pathname.indexOf(dataType.pageFullUrl) === 0;
	const isTypesGroupOptions = pathname.indexOf(`${dataType.pageFullUrl}/options`) === 0;
	const isTypesGroupStatuses = pathname.indexOf(`${dataType.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(dataTypeAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${dataTypeAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${dataTypeAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(dataTypeSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isTypesGroup
					? [{
						flag: (pathname.length > dataType.pageFullUrl.length && (isTypesGroupOptions || isTypesGroupStatuses)),
						to: dataType.pageFullUrl,
					}]
					: (isAccessesGroup
						? [{
							flag: (pathname.length > dataTypeAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
							to: dataTypeAccess.pageFullUrl,
						}]
						: []),
			}, {
				text: 'Options',
				check: isTypesGroup
					? [{
						flag: !isTypesGroupOptions,
						to: `${dataType.pageFullUrl}/options`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupOptions,
							to: `${dataTypeAccess.pageFullUrl}/options`,
						}]
						: []),
			}, {
				text: 'Statuses',
				check: isTypesGroup
					? [{
						flag: !isTypesGroupStatuses,
						to: `${dataType.pageFullUrl}/statuses`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupStatuses,
							to: `${dataTypeAccess.pageFullUrl}/statuses`,
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
