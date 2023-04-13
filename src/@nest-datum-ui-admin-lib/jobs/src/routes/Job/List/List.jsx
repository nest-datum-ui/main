import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListJob from '../../../components/List/Job';

let List = () => {
	return <ContextRoute.Provider value="jobsJobList">
		<PaperList>
			<ListJob />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
