import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { fireClose as actionMenuClose } from '@nest-datum-ui/components/Store/menu/actions/close.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireFormRestore as actionApiFormRestore } from '@nest-datum-ui/components/Store/api/actions/form/restore.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Store from '@nest-datum-ui/components/Store';
import Menu from '@nest-datum-ui/components/Menu';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Context = ({
	entityId,
	isDeleted,
	isNotDelete,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const onEdit = React.useCallback((e) => {
		actionDialogOpen('filesManageFileStore', { entityId })();
		actionMenuClose()();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('filesManageFileDrop', { entityId })();
		actionMenuClose()();
	}, [
		entityId,
	]);
	const onRestore = React.useCallback(async (e) => {
		await actionApiFormProp(entityId, 'loader', true)();
		await actionApiFormRestore({
			storeName: entityId,
			entityId,
			url: process.env.SERVICE_FILES,
			path: 'file',
			withAccessToken: true,
		})(enqueueSnackbar, async () => {
			const filesManageFileList = [ ...((Store()
				.getState()
				.api
				.list
				.filesManageFileList || {})
				.data || []) ];
			const findIndex = filesManageFileList.findIndex((file) => file.id === entityId);

			if (filesManageFileList[findIndex]) {
				filesManageFileList[findIndex]['isDeleted'] = false;

				await actionApiListProp('filesManageFileList', 'data', [ ...filesManageFileList ])();
				await actionApiFormProp(entityId, 'loader', false)();
			}
		});
		await actionMenuClose()();
	}, [
		entityId,
		enqueueSnackbar,
	]);

	return <React.Fragment>
		<Menu { ...props }>
			<MenuItem disabled>
				<ListItemIcon>
					<VisibilityIcon />
				</ListItemIcon>
				<ListItemText>
					View
				</ListItemText>
			</MenuItem>
			<MenuItem
				component={ButtonLink}
				to={`/files/manage/${entityId}`}
				onClick={onEdit}>
				<ListItemIcon>
					<EditIcon />
				</ListItemIcon>
				<ListItemText>
					Edit
				</ListItemText>
			</MenuItem>
			<MenuItem disabled>
				<ListItemIcon>
					<FileCopyIcon />
				</ListItemIcon>
				<ListItemText>
					Copy
				</ListItemText>
			</MenuItem>
			<MenuItem disabled>
				<ListItemIcon>
					<DriveFileMoveIcon />
				</ListItemIcon>
				<ListItemText>
					Move
				</ListItemText>
			</MenuItem>
			{isDeleted
				&& <MenuItem onClick={onRestore}>
					<ListItemIcon>
						<SettingsBackupRestoreIcon />
					</ListItemIcon>
					<ListItemText>
						Restore
					</ListItemText>
				</MenuItem>}
			{!isNotDelete
				&& <MenuItem 
					component={ButtonLink}
					to={`/files/manage/${entityId}`}
					onClick={onDelete}>
					<ListItemIcon>
						<DeleteIcon 
							color={isDeleted
								? 'error'
								: 'inherit'} />
					</ListItemIcon>
					<ListItemText>
						{isDeleted
							? 'Delete permanently'
							: 'Delete'}
					</ListItemText>
				</MenuItem>}
		</Menu>
	</React.Fragment>;
};

Context = React.memo(Context);
Context.defaultProps = {
};
Context.propTypes = {
	entityId: PropTypes.string.isRequired,
};

export default Context;
