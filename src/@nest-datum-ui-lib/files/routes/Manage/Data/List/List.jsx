import React from 'react';
import FilesFormManager from '@nest-datum-ui-lib/files/components/Form/Manager';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<FilesFormManager
			displayBreadcrumbs
			displayFilters
			displaySearch
			displayMenu
			displayCreateFolder
			displayCreateFile />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
