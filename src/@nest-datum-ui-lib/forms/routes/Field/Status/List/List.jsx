import React from 'react';
import FormsDialogFieldStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Status/Drop';
import FormsTableFieldStatus from '@nest-datum-ui-lib/forms/components/Table/Field/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableFieldStatus />
		<FormsDialogFieldStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
