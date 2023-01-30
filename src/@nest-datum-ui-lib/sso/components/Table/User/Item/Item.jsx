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
import SsoTypographyUserStatus from '@nest-datum-ui-lib/sso/components/Typography/User/Status';
import SsoTypographyRole from '@nest-datum-ui-lib/sso/components/Typography/Role';
import MenuContext from '@nest-datum-ui/components/Menu/Context';

let Item = ({
	bulkDeletion,
	id,
	login,
	email,
	roleId,
	userStatusId,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
	emailVerifiedAt,
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
			<TableCell sx={{ minWidth: '20%' }}>
				<TypographyTable
					to={`/sso/user/${id}`}
					isDeleted={isDeleted}>
					{id}
				</TypographyTable>
			</TableCell>
			<TableCell sx={{ minWidth: '21%' }}>
				<TypographyTable
					to={`/sso/user/${id}`}
					isDeleted={isDeleted}>
					{login}
				</TypographyTable>
				<div />
				<TypographyTable
					to={`/sso/user/${id}`}
					isDeleted={isDeleted}>
					{email}
				</TypographyTable>
			</TableCell>
			<TableCell sx={{ minWidth: '17%' }}>
				<SsoTypographyRole>
					{roleId}
				</SsoTypographyRole>
			</TableCell>
			<TableCell sx={{ minWidth: '10%' }}>
				<SsoTypographyUserStatus>
					{userStatusId}
				</SsoTypographyUserStatus>
			</TableCell>
			<TableCell sx={{ width: '20%' }}>
				<TypographyDateTable
					createdAt={createdAt}
					updatedAt={updatedAt}
					emailVerifiedAt={emailVerifiedAt} />
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
	login: PropTypes.string,
	email: PropTypes.string,
	userStatusId: PropTypes.string,
	roleId: PropTypes.string,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	emailVerifiedAt: PropTypes.string,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	onMenu: PropTypes.func,
	onCheck: PropTypes.func,
	storePath: PropTypes.array,
};

export default Item;
