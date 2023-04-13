import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { strIdExists as utilsCheckStrIdExists } from '@nest-datum-utils/check';
import Dialog from '@nest-datum-ui/Dialog';
import FormFolder from '../../Form/Folder';


let Folder = ({ title, id, ...props }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));

	return <Dialog 
		{ ...props } 
		id={id}
		title={utilsCheckStrIdExists(entityId)
			? 'Edit folder'
			: 'Add new folder'}>
		<FormFolder entityId={entityId} />
	</Dialog>;
};

Folder = React.memo(Folder);
Folder.defaultProps = {
	id: 'folderManagerForm',
	onSubmit: () => {},
};
Folder.propTypes = {
	onSubmit: PropTypes.func,
};

export default Folder;