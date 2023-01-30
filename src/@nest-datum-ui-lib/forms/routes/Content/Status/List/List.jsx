import React from 'react';
import FormsDialogContentStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Content/Status/Drop';
import FormsTableContentStatus from '@nest-datum-ui-lib/forms/components/Table/Content/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableContentStatus />
		<FormsDialogContentStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
