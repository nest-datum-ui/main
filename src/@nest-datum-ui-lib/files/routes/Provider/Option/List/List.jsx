import React from 'react';
import FilesDialogProviderOptionDrop from '@nest-datum-ui-lib/files/components/Dialog/Provider/Option/Drop';
import FilesTableProviderOption from '@nest-datum-ui-lib/files/components/Table/Provider/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesTableProviderOption />
		<FilesDialogProviderOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
