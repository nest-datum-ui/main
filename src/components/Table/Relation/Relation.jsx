import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import DialogDropForce from 'components/Dialog/Drop/Force';
import DialogRelation from 'components/Dialog/Relation';
import Table from '../Table.jsx';
import Row from './Row';

let Relation = ({ Component, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));

	return <Table
		BottomComponent={<React.Fragment>
			<DialogDropForce reloadImmediately type="list" />
			<DialogRelation />
		</React.Fragment>}>
		{data && data.map((item, index) => <Row 
			{ ...item } 
			key={item.id} 
			Component={Component} />)}
	</Table>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
};

export default Relation;
