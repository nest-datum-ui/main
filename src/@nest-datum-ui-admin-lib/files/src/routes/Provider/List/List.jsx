import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListProvider from '../../../components/List/Provider';

let List = () => {
	return <ContextRoute.Provider value="filesProviderList">
		<PaperList>
			<ListProvider />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
