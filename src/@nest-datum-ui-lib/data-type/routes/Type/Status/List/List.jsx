import React from 'react';
import DataTypeDialogTypeStatusDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Status/Drop';
import DataTypeTableTypeStatus from '@nest-datum-ui-lib/data-type/components/Table/Type/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<DataTypeTableTypeStatus />
		<DataTypeDialogTypeStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
