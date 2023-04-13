import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		cv: { 
			cvAccess,
			cvSetting,
			cvReport,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isReportGroup = pathname.indexOf(cvReport.pageFullUrl) === 0;
	const isReportGroupStatuses = pathname.indexOf(`${cvReport.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(cvAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${cvAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${cvAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(cvSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{isAccessesGroup
				? ([{
					text: 'Data',
					check: [{
						flag: (pathname.length > cvAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
						to: cvAccess.pageFullUrl,
					}],
				}, {
					text: 'Options',
					check: [{
						flag: !isAccessesGroupOptions,
						to: `${cvAccess.pageFullUrl}/options`,
					}],
				}, {
					text: 'Statuses',
					check: [{
						flag: !isAccessesGroupStatuses,
						to: `${cvAccess.pageFullUrl}/statuses`,
					}],
				}])
				: ([{
					text: 'Data',
					check: isReportGroup
						? [{
							flag: (pathname.length > cvReport.pageFullUrl.length),
							to: cvReport.pageFullUrl,
						}]
						: [],
				}, {
					text: 'Statuses',
					check: isReportGroup
						? [{
							flag: !isReportGroupStatuses,
							to: `${cvReport.pageFullUrl}/statuses`,
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
