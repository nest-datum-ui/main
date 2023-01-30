import React from 'react';
import FormsDialogFormOptionDrop from '@nest-datum-ui-lib/forms/components/Dialog/Form/Option/Drop';
import FormsTableFormOption from '@nest-datum-ui-lib/forms/components/Table/Form/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FormsTableFormOption />
		<FormsDialogFormOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
