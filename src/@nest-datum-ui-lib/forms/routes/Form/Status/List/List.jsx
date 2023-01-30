import React from 'react';
import FormsDialogFormStatusDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Status/Drop';
import FormsTableFormStatus from '@nest-datum-ui-lib/forms/components/Table/Form/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableFormStatus />
		<FormsDialogFormStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
