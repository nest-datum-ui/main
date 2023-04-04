import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListAccess from 'components/List/Access';

let List = () => {
	return <ContextRoute.Provider value="filesAccessList">
		<PaperList>
			<ListAccess />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
