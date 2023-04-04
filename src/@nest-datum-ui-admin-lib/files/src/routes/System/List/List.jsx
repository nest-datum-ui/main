import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListSystem from '../../../components/List/System';

let List = () => {
	return <ContextRoute.Provider value="filesSystemList">
		<PaperList>
			<ListSystem />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
