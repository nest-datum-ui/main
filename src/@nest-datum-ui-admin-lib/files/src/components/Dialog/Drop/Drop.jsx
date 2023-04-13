import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormDrop,
	actionApiListProp, 
	actionDialogClose,
} from '@nest-datum-ui/Store';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/Dialog';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';

let Drop = ({
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
		sliceInList: true,
		type: 'list',
		apiUrl: (type === 'folder')
			? folderApiUrl
			: fileApiUrl, 
	})(() => {
		actionDialogClose()();
		actionApiListProp(storeName, 'updatedIndex', Date.now())();
	}), [
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

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'fileManagerDrop',
	title: 'Delete item?',
	content: 'Are you sure you want to delete the current item? This operation is irreversible and may compromise data integrity.',
	onSubmit: () => {},
};
Drop.propTypes = {
	onSubmit: PropTypes.func,
};

export default Drop;