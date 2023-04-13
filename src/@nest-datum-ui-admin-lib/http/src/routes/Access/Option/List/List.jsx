import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListOption from 'components/List/Option';

let List = () => {
	return <ContextRoute.Provider value="httpAccessOptionList">
		<PaperList>
			<ListOption />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
