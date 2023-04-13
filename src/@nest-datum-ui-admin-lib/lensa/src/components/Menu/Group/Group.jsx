import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		lensa: { 
			lensaAccess,
			lensaSetting,
			lensaReport,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isReportGroup = pathname.indexOf(lensaReport.pageFullUrl) === 0;
	const isReportGroupStatuses = pathname.indexOf(`${lensaReport.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(lensaAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${lensaAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${lensaAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(lensaSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{isAccessesGroup
				? ([{
					text: 'Data',
					check: [{
						flag: (pathname.length > lensaAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
						to: lensaAccess.pageFullUrl,
					}],
				}, {
					text: 'Options',
					check: [{
						flag: !isAccessesGroupOptions,
						to: `${lensaAccess.pageFullUrl}/options`,
					}],
				}, {
					text: 'Statuses',
					check: [{
						flag: !isAccessesGroupStatuses,
						to: `${lensaAccess.pageFullUrl}/statuses`,
					}],
				}])
				: ([{
					text: 'Data',
					check: isReportGroup
						? [{
							flag: (pathname.length > lensaReport.pageFullUrl.length),
							to: lensaReport.pageFullUrl,
						}]
						: [],
				}, {
					text: 'Statuses',
					check: isReportGroup
						? [{
							flag: !isReportGroupStatuses,
							to: `${lensaReport.pageFullUrl}/statuses`,
						}]
						: [],
				}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
