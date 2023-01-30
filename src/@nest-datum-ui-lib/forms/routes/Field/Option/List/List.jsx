import React from 'react';
import FormsDialogFieldOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Option/Drop';
import FormsTableFieldOption from '@nest-datum-ui-lib/forms/components/Table/Field/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableFieldOption />
		<FormsDialogFieldOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
