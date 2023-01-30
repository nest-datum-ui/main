import React from 'react';
import FormsDialogContentDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Drop';
import FormsTableContent from '@nest-datum-ui-lib/forms/components/Table/Content';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableContent />
		<FormsDialogContentDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
