import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Table from 'components/Table';
import FilesDialogDisable from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Disable';
import FilesDialogDrop from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Drop';
import FilesFolder from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Folder';
import FilesFile from '@nest-datum-ui-admin-lib/files/src/components/Dialog/File';
import Row from './Row';

let Manager = (props) => {
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

	return <Table BottomComponent={<React.Fragment>
		<FilesDialogDisable />
		<FilesDialogDrop />
		<FilesFolder />
		<FilesFile />
	</React.Fragment>}>
		{data
			&& data.map((item, index) => <Row
				key={item.id}
				id={item.id}
				parentId={item.parentId}
				path={item.path}
				name={item.name}
				description={item.description}
				type={item.type}
				size={item.size}
				userId={item.userId}
				isDeleted={item.isDeleted}
				isNotDelete={item.isNotDelete}
				createdAt={item.createdAt}
				updatedAt={item.updatedAt}
				disableLink />)}
	</Table>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
};
Manager.propTypes = {
};

export default Manager;
