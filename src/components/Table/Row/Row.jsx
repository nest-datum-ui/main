import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import { useSelector } from 'react-redux';
import { 
	selectorMainArrayIncludes,
	actionApiFormRestore,
	actionApiListCheck,
	actionDialogOpen,
	actionMenuOpen, 
} from '@nest-datum-ui/Store';
import { 
	arr as utilsCheckArr,
	obj as utilsCheckObj, 
	func as utilsCheckFunc,
} from '@nest-datum-utils/check';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import TypographyTableDate from 'components/Typography/Table/Date';
import MenuContext from 'components/Menu/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	children,
	id,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
	onDrop,
	onDropForce,
	onRestore,
	onCheck,
	onMenu,
	onEdit,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName, 
				apiFullUrl: apiUrl, 
				bulkDeletion, 
				rowColumns, 
				withContextMenu,
				withForceDropMenu,  
			}, 
		},
	} = React.useContext(ContextProps);
	const checked = useSelector(selectorMainArrayIncludes([ 'api', 'list', storeName, 'selected' ], id));
	const onDropWrapper = React.useCallback((e) => (utilsCheckFunc(onDrop))
		? onDrop(e, { id, isDeleted })
		: actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId: id })(), [
		id,
		isDeleted,
		onDrop,
	]);
	const onDropForceWrapper = React.useCallback((e) => (utilsCheckFunc(onDropForce))
		? onDropForce(e, { id })
		: actionDialogOpen('drop-force', { entityId: id })(), [
		id,
		onDropForce,
	]);
	const onRestoreWrapper = React.useCallback((e) => (utilsCheckFunc(onRestore))
		? onRestore(e, { id })
		: actionApiFormRestore(storeName, { apiUrl, entityId: id, type: 'list' })(), [
		storeName,
		apiUrl,
		id,
		onRestore,
	]);
	const onCheckWrapper = React.useCallback((e) => (utilsCheckFunc(onCheck))
		? onCheck(e, { id, isNotDelete, isDeleted })
		: actionApiListCheck(storeName, id, isNotDelete, isDeleted)(e), [
		storeName,
		id,
		isNotDelete,
		isDeleted,
		onCheck,
	]);
	const onMenuWrapper = React.useCallback((e) => (utilsCheckFunc(onMenu))
		? onMenu(e, { id })
		: actionMenuOpen(id, e.target)(), [
		id,
		onMenu,
	]);
	const averageWidth = 100 / rowColumns.length;
	const firstCellWith = bulkDeletion
		? (rowColumns[0].width || averageWidth) - 1
		: (rowColumns[0].width || averageWidth);
	const lastCellWith = bulkDeletion
		? (rowColumns[rowColumns.length - 1].width || averageWidth) - 1
		: (rowColumns[rowColumns.length - 1].width || averageWidth);
	const displayRowStory = rowColumns.findIndex((item) => (item['id'] === 'story')) >= 0;

	return <StyledWrapper { ...props }>
		{bulkDeletion 
			&& <TableCell
				padding="checkbox"
				sx={{ minWidth: '1%' }}>
				<Checkbox 
					checked={!!checked}
					onChange={onCheckWrapper} />
			</TableCell>}
		{utilsCheckArr(children)
			? children.map((item, index) => (utilsCheckObj(item) && typeof item['$$typeof'] === 'symbol')
				? item
				: <TableCell key={index} sx={{ minWidth: `${firstCellWith}%` }} { ...(item.props || {}) }>
					{item.children}
				</TableCell>)
			: children}
		{displayRowStory && (createdAt || updatedAt)
			&& <TableCell sx={{ width: `${lastCellWith}%` }}>
				<TypographyTableDate
					createdAt={createdAt}
					updatedAt={updatedAt} />
			</TableCell>}
		{withForceDropMenu
			? <TableCell sx={{ width: '1%' }}>
				<IconButton color="error" onClick={onDropForceWrapper}>
					<CloseIcon color="error" />
				</IconButton>
			</TableCell>
			: (withContextMenu
				&& <TableCell sx={{ width: '1%' }}>
					<IconButton onClick={onMenuWrapper}>
						<MoreVertIcon />
					</IconButton>
					<MenuContext 
						id={id}
						isDeleted={isDeleted}
						isNotDelete={isNotDelete}
						onEdit={onEdit}
						onDrop={onDropWrapper}
						onRestore={onRestoreWrapper} />
				</TableCell>)}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	isDeleted: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	isNotDelete: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	storeName: PropTypes.string,
	onDrop: PropTypes.func,
	onDropForce: PropTypes.func,
	onRestore: PropTypes.func,
	onCheck: PropTypes.func,
	onMenu: PropTypes.func, 
	onEdit: PropTypes.func,
};

export default Row;
