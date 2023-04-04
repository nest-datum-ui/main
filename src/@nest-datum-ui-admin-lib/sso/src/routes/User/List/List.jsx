import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListUser from '../../../components/List/User';

let List = () => {
	return <ContextRoute.Provider value="ssoUserList">
		<PaperList>
			<ListUser />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
