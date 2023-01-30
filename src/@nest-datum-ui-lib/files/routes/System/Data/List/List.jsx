import React from 'react';
import FilesDialogSystemDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Drop';
import FilesTableSystem from '@nest-datum-ui-lib/files/components/Table/System';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableSystem />
		<FilesDialogSystemDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
