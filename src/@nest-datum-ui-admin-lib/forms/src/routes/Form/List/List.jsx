import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListForm from '../../../components/List/Form';

let List = () => {
	return <ContextRoute.Provider value="formsFormList">
		<PaperList>
			<ListForm />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
