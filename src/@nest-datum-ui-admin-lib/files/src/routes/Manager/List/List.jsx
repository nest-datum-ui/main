import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListManager from '../../../components/List/Manager';

let List = () => {
	return <ContextRoute.Provider value="filesManagerList">
		<PaperList>
			<ListManager />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
