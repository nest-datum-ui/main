import React from 'react';
import DataTypeDialogTypeDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Drop';
import DataTypeTableType from '@nest-datum-ui-lib/data-type/components/Table/Type';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<DataTypeTableType />
		<DataTypeDialogTypeDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
