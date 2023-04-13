import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		jobs: { 
			jobsAccess,
			jobsSetting,
			jobsJob,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isJobGroup = pathname.indexOf(jobsJob.pageFullUrl) === 0;
	const isJobGroupOptions = pathname.indexOf(`${jobsJob.pageFullUrl}/options`) === 0;
	const isJobGroupStatuses = pathname.indexOf(`${jobsJob.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(jobsAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${jobsAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${jobsAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(jobsSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isJobGroup
					? [{
						flag: (pathname.length > jobsJob.pageFullUrl.length && (isJobGroupOptions || isJobGroupStatuses)),
						to: jobsJob.pageFullUrl,
					}]
					: (isAccessesGroup
						? [{
							flag: (pathname.length > jobsAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
							to: jobsAccess.pageFullUrl,
						}]
						: []),
			}, {
				text: 'Options',
				check: isJobGroup
					? [{
						flag: !isJobGroupOptions,
						to: `${jobsJob.pageFullUrl}/options`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupOptions,
							to: `${jobsAccess.pageFullUrl}/options`,
						}]
						: []),
			}, {
				text: 'Statuses',
				check: isJobGroup
					? [{
						flag: !isJobGroupStatuses,
						to: `${jobsJob.pageFullUrl}/statuses`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupStatuses,
							to: `${jobsAccess.pageFullUrl}/statuses`,
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
