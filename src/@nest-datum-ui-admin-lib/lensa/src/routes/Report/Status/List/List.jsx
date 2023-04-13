import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListStatus from 'components/List/Status';

let List = () => {
	return <ContextRoute.Provider value="lensaReportStatusList">
		<PaperList>
			<ListStatus />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
