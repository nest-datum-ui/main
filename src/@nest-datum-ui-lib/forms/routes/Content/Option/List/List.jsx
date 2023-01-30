import React from 'react';
import FormsDialogContentOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Option/Drop';
import FormsTableContentOption from '@nest-datum-ui-lib/forms/components/Table/Content/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableContentOption />
		<FormsDialogContentOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
