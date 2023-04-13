import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListTemplate from '../../../components/List/Template';

let List = () => {
	return <ContextRoute.Provider value="dictionaryTemplateList">
		<PaperList>
			<ListTemplate />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
