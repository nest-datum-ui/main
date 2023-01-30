import React from 'react';
import FilesDialogProviderDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Drop';
import FilesTableProvider from '@nest-datum-ui-lib/files/components/Table/Provider';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableProvider />
		<FilesDialogProviderDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
