import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListLetter from '../../../components/List/Letter';

let List = () => {
	return <ContextRoute.Provider value="mailLetterList">
		<PaperList>
			<ListLetter />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
