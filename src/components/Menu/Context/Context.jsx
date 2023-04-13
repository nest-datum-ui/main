import React from 'react';
import PropTypes from 'prop-types';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Menu from '@nest-datum-ui/Menu';
import ButtonMenu from '@nest-datum-ui/Button/Menu';
import handlerClose from './handler/close.js';
import handlerDrop from './handler/drop.js';
import handlerRestore from './handler/restore.js';
import handlerEdit from './handler/edit.js';

let Context = ({
	id,
	isDeleted,
	isNotDelete,
	onEdit,
	onClose,
	onDrop,
	onRestore,
	edit,
	copy,
	restore,
	drop,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { parentName } } } = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);
	const onContextClose = React.useCallback((e) => handlerClose(e, onClose), [
		onClose,
	]);
	const onContextEdit = React.useCallback((e) => handlerEdit(e, onEdit, onContextClose, id), [
		onEdit,
		onContextClose,
		id,
	]);
	const onContextDrop = React.useCallback((e) => handlerDrop(e, onDrop, onContextClose, id), [
		onDrop,
		onContextClose,
		id,
	]);
	const onContextRestore = React.useCallback((e) => handlerRestore(e, onRestore, onContextClose, id), [
		onRestore,
		onContextClose,
		id,
	]);
	const isDefault = edit
		|| copy
		|| restore
		|| drop;

	return <Menu id={id} { ...props }>
		{!!(!isDefault || edit)
			&& <ButtonMenu icon={<EditIcon />}
				{ ...(utilsCheckFunc(onEdit))
					? { onClick: onContextEdit }
					: {
						to: `${pageFullUrl}/${id}`,
						onClick: onContextClose,
					} }>
				Edit
			</ButtonMenu>}
		{!!(!isDefault || copy)
			&& <ButtonMenu disabled icon={<FileCopyIcon />}>
				Copy
			</ButtonMenu>}
		{!!((!isDefault || restore) && isDeleted)
			&& <ButtonMenu
				icon={<SettingsBackupRestoreIcon />}
				onClick={onContextRestore}>
				Restore
			</ButtonMenu>}
		{!!((!isDefault || drop) && !isNotDelete)
			&& <ButtonMenu
				icon={<DeleteIcon
					color={isDeleted
						? 'error'
						: 'inherit'} />}
				onClick={onContextDrop}>
			{isDeleted
				? 'Delete'
				: 'Disable'}
			</ButtonMenu>}
	</Menu>;
};

Context = React.memo(Context);
Context.defaultProps = {
};
Context.propTypes = {
	id: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	isDeleted: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	isNotDelete: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	edit: PropTypes.bool,
	copy: PropTypes.bool,
	restore: PropTypes.bool,
	drop: PropTypes.bool,
};

export default Context;
