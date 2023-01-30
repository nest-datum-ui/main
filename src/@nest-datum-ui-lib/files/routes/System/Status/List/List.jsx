import React from 'react';
import FilesDialogSystemStatusDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Status/Drop';
import FilesTableSystemStatus from '@nest-datum-ui-lib/files/components/Table/System/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableSystemStatus />
		<FilesDialogSystemStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
