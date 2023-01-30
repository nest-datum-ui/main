import React from 'react';
import FormsDialogFieldDrop from '@nest-datum-ui-lib/forms/components/Dialog/Field/Drop';
import FormsTableField from '@nest-datum-ui-lib/forms/components/Table/Field';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableField />
		<FormsDialogFieldDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
