import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireClose as actionMenuClose } from 'components/Store/menu/actions/close.js';
import { fireOpen as actionDialogOpen } from 'components/Store/dialog/actions/open.js';
import { fireFormRestore as actionApiFormRestore } from 'components/Store/api/actions/form/restore.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Menu from 'components/Menu';
// import Link from 'components/Link';

let Context = ({
	entityId,
	isDeleted,
	isNotDelete,
	type,
	name,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const onUpdate = React.useCallback((e) => {
		actionDialogOpen(`storage-${type}-update`, { 
			entityId,
			type, 
			name,
		})();
		actionMenuClose()();
	}, [
		entityId,
		type,
		name,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen(`storage-${type}-drop`, { 
			entityId,
			type, 
		})();
		actionMenuClose()();
	}, [
		entityId,
		type,
	]);
	const onRestore = React.useCallback((e) => {
		actionApiFormRestore({
			storeName: 'storageList',
			entityId,
			url: gateway,
			path: type,
			withAccessToken: true,
		})(enqueueSnackbar);
		actionMenuClose()();
	}, [
		gateway,
		entityId,
		type,
		enqueueSnackbar,
	]);

	return <React.Fragment>
		<Menu { ...props }>
			<MenuItem onClick={onUpdate}>
				<ListItemIcon>
					<EditIcon />
				</ListItemIcon>
				<ListItemText>
					Переименовать
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
			<MenuItem disabled>
				<ListItemIcon>
					<TrendingFlatIcon />
				</ListItemIcon>
				<ListItemText>
					Переместить
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
	type: 'file',
};
Context.propTypes = {
	entityId: PropTypes.string.isRequired,
};

export default Context;
