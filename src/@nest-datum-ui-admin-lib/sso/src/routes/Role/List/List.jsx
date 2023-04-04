import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListRole from '../../../components/List/Role';

let List = () => {
	return <ContextRoute.Provider value="ssoRoleList">
		<PaperList>
			<ListRole />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
