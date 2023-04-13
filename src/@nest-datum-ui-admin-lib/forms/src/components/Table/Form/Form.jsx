import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Table from 'components/Table';
import DialogDrop from 'components/Dialog/Drop';
import DialogDropMany from 'components/Dialog/Drop/Many';
import DialogDisable from 'components/Dialog/Disable';
import DialogDisableMany from 'components/Dialog/Disable/Many';
import Row from './Row';

let Form = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));

	return <Table BottomComponent={<React.Fragment>
		<DialogDrop type="list" />
		<DialogDropMany />
		<DialogDisable type="list" />
		<DialogDisableMany />
	</React.Fragment>}>
		{data
			&& data.map((item, index) => <Row
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				formStatusId={item.formStatusId}
				userId={item.userId}
				isDeleted={item.isDeleted}
				isNotDelete={item.isNotDelete}
				createdAt={item.createdAt}
				updatedAt={item.updatedAt} />)}
	</Table>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
