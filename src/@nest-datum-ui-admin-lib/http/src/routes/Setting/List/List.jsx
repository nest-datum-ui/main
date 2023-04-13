import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListSetting from 'components/List/Setting';

let List = () => {
	return <ContextRoute.Provider value="httpSettingList">
		<PaperList>
			<ListSetting />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
