import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListContent from '../../../components/List/Content';

let List = () => {
	return <ContextRoute.Provider value="mailContentList">
		<PaperList>
			<ListContent />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
