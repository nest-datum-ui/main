import React from 'react';
import FilesDialogSystemOptionDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Option/Drop';
import FilesTableSystemOption from '@nest-datum-ui-lib/files/components/Table/System/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableSystemOption />
		<FilesDialogSystemOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
