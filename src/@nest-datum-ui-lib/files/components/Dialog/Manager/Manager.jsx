import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	FILES_PATH_FOLDER,
	// FILES_PATH_FILE, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Dialog from '@nest-datum-ui/components/Dialog';
import FilesFormManager from '@nest-datum-ui-lib/files/components/Form/Manager';

let Manager = ({ onChange }) => {
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'loader' ]));
	const onFile = React.useCallback((e, { id, path }) => {
		onChange({
			target: {
				value: id,
				path,
			},
			currentTarget: {
				value: id,
				path,
			},
		});
	}, [
		onChange,
	]);

	return <React.Fragment>
		<Dialog 
			id={`${FILES_PATH_FOLDER}/manager`}
			loader={listLoader === true}
			maxWidth="lg"
			title="File system"
			PaperProps={{
				sx: {
					minHeight: 'calc(100% - 64px) !important',
				},
			}}>
			<FilesFormManager
				displayBreadcrumbs
				displayFilters
				displaySearch
				onFile={onFile} />
		</Dialog>
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	onChange: (() => {}),
};
Manager.propTypes = {
	onChange: PropTypes.func,
};

export default Manager;