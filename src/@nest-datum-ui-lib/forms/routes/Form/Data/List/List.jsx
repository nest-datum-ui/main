import React from 'react';
import FormsDialogFormDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Drop';
import FormsTableForm from '@nest-datum-ui-lib/forms/components/Table/Form';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableForm />
		<FormsDialogFormDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
