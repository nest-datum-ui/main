import React from 'react';
import DataTypeDialogTypeOptionDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Option/Drop';
import DataTypeTableTypeOption from '@nest-datum-ui-lib/data-type/components/Table/Type/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<DataTypeTableTypeOption />
		<DataTypeDialogTypeOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
