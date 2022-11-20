import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { fireClose as actionMenuClose } from '@nest-datum-ui/components/Store/menu/actions/close.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireFormRestore as actionApiFormRestore } from '@nest-datum-ui/components/Store/api/actions/form/restore.js';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Menu from '@nest-datum-ui/components/Menu';
import Link from '@nest-datum-ui/components/Link';

let Context = ({
	storeName,
	entityId,
	url,
	path,
	withAccessToken,
	isDeleted,
	isNotDelete,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const onClose = React.useCallback((e) => {
		actionMenuClose()();
	}, [
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('settingDrop', { entityId })();
		actionMenuClose()();
	}, [
		entityId,
	]);
	const onRestore = React.useCallback((e) => {
		actionApiFormRestore({
			storeName,
			entityId,
			url,
			path,
			withAccessToken,
		})(enqueueSnackbar);
		actionMenuClose()();
	}, [
		storeName,
		entityId,
		url,
		path,
		withAccessToken,
		enqueueSnackbar,
	]);

	return <React.Fragment>
		<Menu { ...props }>
			<MenuItem
				component={Link}
				to={entityId}
				onClick={onClose}>
				<ListItemIcon>
					<EditIcon />
				</ListItemIcon>
				<ListItemText>
					Редактировать
				</ListItemText>
			</MenuItem>
			<MenuItem disabled>
				<ListItemIcon>
					<FileCopyIcon />
				</ListItemIcon>
				<ListItemText>
					Копировать
				</ListItemText>
			</MenuItem>
			{isDeleted
				&& <MenuItem onClick={onRestore}>
					<ListItemIcon>
						<SettingsBackupRestoreIcon />
					</ListItemIcon>
					<ListItemText>
						Восстновить
					</ListItemText>
				</MenuItem>}
			{!isNotDelete
				&& <MenuItem onClick={onDelete}>
					<ListItemIcon>
						<DeleteIcon 
							color={isDeleted
								? 'error'
								: 'inherit'} />
					</ListItemIcon>
					<ListItemText>
						{isDeleted
							? 'Удалить навсегда'
							: 'Удалить'}
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
