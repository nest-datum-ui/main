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
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId: id })(), [
		id,
		isDeleted,
	]);
	const onDropForce = React.useCallback(() => actionDialogOpen('drop-force', { entityId: id })(), [
		id,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl, entityId: id, type: 'list' })(), [
		storeName,
		apiUrl,
		id,
	]);
	const onCheck = React.useCallback((e) => actionApiListCheck(storeName, id, isNotDelete, isDeleted)(e), [
		storeName,
		id,
		isNotDelete,
		isDeleted,
	]);
	const onMenu = React.useCallback((e) => actionMenuOpen(id, e.target)(), [
		id,
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
					onChange={onCheck} />
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
				<IconButton color="error" onClick={onDropForce}>
					<CloseIcon color="error" />
				</IconButton>
			</TableCell>
			: (withContextMenu
				&& <TableCell sx={{ width: '1%' }}>
					<IconButton onClick={onMenu}>
						<MoreVertIcon />
					</IconButton>
					<MenuContext 
						id={id}
						isDeleted={isDeleted}
						isNotDelete={isNotDelete}
						onDrop={onDrop}
						onRestore={onRestore} />
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
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	storeName: PropTypes.string, 
};

export default Row;
