import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormFile from '../../Form/File';

let File = ({ title, id, ...props }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));

	return <Dialog 
		{ ...props } 
		id={id}
		title="Edit file">
		<FormFile entityId={entityId} />
	</Dialog>;
};

File = React.memo(File);
File.defaultProps = {
	id: 'fileManagerForm',
	onSubmit: () => {},
};
File.propTypes = {
	onSubmit: PropTypes.func,
};

export default File;