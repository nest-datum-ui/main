import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainIncludes from '@nest-datum-ui/components/Store/main/selectors/includes.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TypographyDateTable from '@nest-datum-ui/components/Typography/Date/Table';
import SsoTypographyUser from '@nest-datum-ui-lib/sso/components/Typography/User';
import MenuContext from '@nest-datum-ui/components/Menu/Context';

let Item = ({
	bulkDeletion,
	id,
	servId,
	replicaId,
	action,
	content,
	userId,
	createdAt,
	onClose,
	onDrop,
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
			<TableCell sx={{ minWidth: '14%' }}>
				<Typography component="div">
					{id}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '16%' }}>
				<Typography component="div">
					{replicaId}
				</Typography>
				<div />
				<Typography component="div">
					{servId}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '18%' }}>
				<Typography component="div">
					{action}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '23%' }}>
				<Typography component="div">
					{(content || '').length > 100
						? `${(content || '').substring(0, 100)}...`
						: (content || '')}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '13%' }}>
				<SsoTypographyUser>
					{userId}
				</SsoTypographyUser>
			</TableCell>
			<TableCell sx={{ width: '15%' }}>
				<TypographyDateTable>
					{createdAt}
				</TypographyDateTable>
			</TableCell>
			<TableCell sx={{ width: '1%' }}>
				<IconButton onClick={onMenu}>
					<MoreVertIcon />
				</IconButton>
				<MenuContext 
					id={id}
					onClose={onClose}
					onDrop={onDrop}
					drop />
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
	servId: PropTypes.string,
	replicaId: PropTypes.string,
	action: PropTypes.string,
	createdAt: PropTypes.string,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onMenu: PropTypes.func,
	onCheck: PropTypes.func,
	storePath: PropTypes.array,
};

export default Item;
