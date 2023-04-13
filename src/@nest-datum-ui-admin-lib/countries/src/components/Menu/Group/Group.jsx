import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		countries: { 
			countriesAccess,
			countriesSetting,
			countriesCountry,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isCountryGroup = pathname.indexOf(countriesCountry.pageFullUrl) === 0;
	const isCountryGroupOptions = pathname.indexOf(`${countriesCountry.pageFullUrl}/options`) === 0;
	const isCountryGroupStatuses = pathname.indexOf(`${countriesCountry.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(countriesAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${countriesAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${countriesAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(countriesSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isCountryGroup
					? [{
						flag: (pathname.length > countriesCountry.pageFullUrl.length && (isCountryGroupOptions || isCountryGroupStatuses)),
						to: countriesCountry.pageFullUrl,
					}]
					: (isAccessesGroup
						? [{
							flag: (pathname.length > countriesAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
							to: countriesAccess.pageFullUrl,
						}]
						: []),
			}, {
				text: 'Options',
				check: isCountryGroup
					? [{
						flag: !isCountryGroupOptions,
						to: `${countriesCountry.pageFullUrl}/options`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupOptions,
							to: `${countriesAccess.pageFullUrl}/options`,
						}]
						: []),
			}, {
				text: 'Statuses',
				check: isCountryGroup
					? [{
						flag: !isCountryGroupStatuses,
						to: `${countriesCountry.pageFullUrl}/statuses`,
					}]
					: (isAccessesGroup
						? [{
							flag: !isAccessesGroupStatuses,
							to: `${countriesAccess.pageFullUrl}/statuses`,
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
