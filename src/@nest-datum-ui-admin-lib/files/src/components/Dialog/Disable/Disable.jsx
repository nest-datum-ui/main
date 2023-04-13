import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextRoute,
	ContextService,
	ContextProps, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormDrop, 
	actionDialogClose,
} from '@nest-datum-ui/Store';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/Dialog';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';

let Disable = ({
	id,
	content,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				folders: {
					apiFullUrl: folderApiUrl,
				},
				files: {
					apiFullUrl: fileApiUrl,
				},
			}, 
		}, 
	} = React.useContext(ContextProps);
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const type = useSelector(selectorMainExtract([ 'dialog', id, 'type' ]));
	const onSubmit = React.useCallback(() => actionApiFormDrop(storeName, { 
		entityId, 
		type: 'list', 
		apiUrl: (type === 'folder')
			? folderApiUrl
			: fileApiUrl,
	})(() => actionDialogClose()()), [
		storeName,
		entityId,
		folderApiUrl,
		fileApiUrl,
		type,
	]);

	return <Dialog actions={<ButtonPrimary onClick={onSubmit}>OK</ButtonPrimary>} id={id} { ...props }>
		{content 
			&& <DialogContentText>
				{content}
			</DialogContentText>}
	</Dialog>;
};

Disable = React.memo(Disable);
Disable.defaultProps = {
	id: 'fileManagerDisable',
	title: 'Disable item?',
	content: 'Are you sure you want to disable the current item? The element will not be processed by API.',
	onSubmit: () => {},
};
Disable.propTypes = {
	onSubmit: PropTypes.func,
};

export default Disable;