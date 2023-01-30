import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainIncludes from '@nest-datum-ui/components/Store/main/selectors/includes.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TypographyTable from '@nest-datum-ui/components/Typography/Table';
import TypographyDateTable from '@nest-datum-ui/components/Typography/Date/Table';
import FormsTypographyFieldStatus from '@nest-datum-ui-lib/forms/components/Typography/Field/Status';
import SsoTypographyUser from '@nest-datum-ui-lib/sso/components/Typography/User';
import MenuContext from '@nest-datum-ui/components/Menu/Context';

let Item = ({
	bulkDeletion,
	id,
	name,
	description,
	dataTypeId,
	fieldStatusId,
	userId,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
	onClose,
	onDrop,
	onRestore,
	onMenu,
	onCheck,
	storePath,
}) => {
	const checked = useSelector(selectorMainIncludes([ ...storePath, 'selected' ], id));

	return <React.Fragment>
		<TableRow key={id}>
			{(bulkDeletion && utilsCheckArr(storePath))
				&& <TableCell
					padding="checkbox"
					sx={{ minWidth: '1%' }}>
					<Checkbox 
						checked={checked}
						onChange={onCheck} />
				</TableCell>}
			<TableCell sx={{ minWidth: '21%' }}>
				<TypographyTable
					to={`/forms/field/${id}`}
					isDeleted={isDeleted}>
					{id}
				</TypographyTable>
			</TableCell>
			<TableCell sx={{ minWidth: '17%' }}>
				<TypographyTable
					to={`/forms/field/${id}`}
					isDeleted={isDeleted}
					variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable
					to={`/forms/field/${id}`}
					isDeleted={isDeleted}
					variant="caption">
					{description}
				</TypographyTable>
			</TableCell>
			<TableCell sx={{ minWidth: '20%' }}>
				<FormsTypographyFieldStatus>
					{fieldStatusId}
				</FormsTypographyFieldStatus>
			</TableCell>
			<TableCell sx={{ minWidth: '10%' }}>
				<SsoTypographyUser>
					{userId}
				</SsoTypographyUser>
			</TableCell>
			<TableCell sx={{ width: '20%' }}>
				<TypographyDateTable
					createdAt={createdAt}
					updatedAt={updatedAt} />
			</TableCell>
			<TableCell sx={{ width: '1%' }}>
				<IconButton onClick={onMenu}>
					<MoreVertIcon />
				</IconButton>
				<MenuContext 
					id={id}
					isDeleted={isDeleted}
					isNotDelete={isNotDelete}
					onClose={onClose}
					onDrop={onDrop}
					onRestore={onRestore} />
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	bulkDeletion: false,
	onCheck: () => {},
};
Item.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	dataTypeId: PropTypes.string,
	fieldStatusId: PropTypes.string,
	userId: PropTypes.string,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	onMenu: PropTypes.func,
	onCheck: PropTypes.func,
	storePath: PropTypes.array,
};

export default Item;
