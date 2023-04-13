import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListReport from '../../../components/List/Report';

let List = () => {
	return <ContextRoute.Provider value="cvReportList">
		<PaperList>
			<ListReport />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
