import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListCountry from '../../../components/List/Country';

let List = () => {
	return <ContextRoute.Provider value="countriesCountryList">
		<PaperList>
			<ListCountry />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
