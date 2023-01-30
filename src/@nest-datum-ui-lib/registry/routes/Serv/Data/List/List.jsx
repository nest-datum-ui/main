import React from 'react';
import RegistryTableServ from '@nest-datum-ui-lib/registry/components/Table/Serv';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<RegistryTableServ />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
