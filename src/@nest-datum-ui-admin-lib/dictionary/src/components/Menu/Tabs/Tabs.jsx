import React from 'react';
import PropTypes from 'prop-types';
import { ContextProps } from '@nest-datum-ui/Context';
import MenuTabs from 'components/Menu/Tabs';
import MenuTabsTab from 'components/Menu/Tabs/Tab';

let Tabs = () => {
	const { 
		dictionary: { 
			dictionaryAccess,
			dictionarySetting,
			dictionaryTemplate,
			dictionaryField,
			dictionaryContent,
		}, 
	} = React.useContext(ContextProps);

	return <MenuTabs>
		{([
			dictionaryTemplate,
			dictionaryField,
			dictionaryContent,
			dictionaryAccess,
			dictionarySetting,
		]).map((item) => ({
			label: item.headerTabMenuTitle,
			to: item.pageFullUrl,
			display: item.displayInHeaderTabMenu,
			Component: MenuTabsTab,
		}))}
	</MenuTabs>;
};

Tabs = React.memo(Tabs);
Tabs.defaultProps = {
	onChange: () => {},
};
Tabs.propTypes = {
	onChange: PropTypes.func,
};

export default Tabs;
