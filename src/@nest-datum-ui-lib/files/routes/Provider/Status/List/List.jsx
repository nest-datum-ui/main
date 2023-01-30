import React from 'react';
import FilesDialogProviderStatusDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Status/Drop';
import FilesTableProviderStatus from '@nest-datum-ui-lib/files/components/Table/Provider/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableProviderStatus />
		<FilesDialogProviderStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
