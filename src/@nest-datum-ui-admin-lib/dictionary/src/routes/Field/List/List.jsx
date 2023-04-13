import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListField from '../../../components/List/Field';

let List = () => {
	return <ContextRoute.Provider value="dictionaryFieldList">
		<PaperList>
			<ListField />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
