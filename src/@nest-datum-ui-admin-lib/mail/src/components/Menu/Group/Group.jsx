import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		mail: { 
			mailAccess,
			mailSetting,
			mailLetter,
			mailTemplate,
			mailReport,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isLetterGroup = pathname.indexOf(mailLetter.pageFullUrl) === 0;
	const isLetterGroupOptions = pathname.indexOf(`${mailLetter.pageFullUrl}/options`) === 0;
	const isLetterGroupStatuses = pathname.indexOf(`${mailLetter.pageFullUrl}/statuses`) === 0;
	const isTemplateGroup = pathname.indexOf(mailTemplate.pageFullUrl) === 0;
	const isTemplateGroupOptions = pathname.indexOf(`${mailTemplate.pageFullUrl}/options`) === 0;
	const isTemplateGroupStatuses = pathname.indexOf(`${mailTemplate.pageFullUrl}/statuses`) === 0;
	const isReportGroup = pathname.indexOf(mailReport.pageFullUrl) === 0;
	const isReportGroupStatuses = pathname.indexOf(`${mailReport.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(mailAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${mailAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${mailAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(mailSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isLetterGroup
					? [{
						flag: (pathname.length > mailLetter.pageFullUrl.length && (isLetterGroupOptions || isLetterGroupStatuses)),
						to: mailLetter.pageFullUrl,
					}]
					: (isTemplateGroup
						? [{
							flag: (pathname.length > mailTemplate.pageFullUrl.length && (isTemplateGroupOptions || isTemplateGroupStatuses)),
							to: mailTemplate.pageFullUrl,
						}]
						: (isReportGroup
							? [{
								flag: (pathname.length > mailReport.pageFullUrl.length && isReportGroupStatuses),
								to: mailReport.pageFullUrl,
							}]
							: (isAccessesGroup
								? [{
									flag: (pathname.length > mailAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
									to: mailAccess.pageFullUrl,
								}]
								: []))),
			}, {
				text: 'Options',
				check: isLetterGroup
					? [{
						flag: !isLetterGroupOptions,
						to: `${mailLetter.pageFullUrl}/options`,
					}]
					: (isTemplateGroup
						? [{
							flag: !isTemplateGroupOptions,
							to: `${mailTemplate.pageFullUrl}/options`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${mailAccess.pageFullUrl}/options`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isLetterGroup
					? [{
						flag: !isLetterGroupStatuses,
						to: `${mailLetter.pageFullUrl}/statuses`,
					}]
					: (isTemplateGroup
						? [{
							flag: !isTemplateGroupStatuses,
							to: `${mailTemplate.pageFullUrl}/statuses`,
						}]
						: (isReportGroup
							? [{
								flag: !isReportGroupStatuses,
								to: `${mailReport.pageFullUrl}/statuses`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupStatuses,
									to: `${mailAccess.pageFullUrl}/statuses`,
								}]
								: []))),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
